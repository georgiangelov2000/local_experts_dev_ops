<?php

namespace App\Http\Controllers\Api\V1\FrontEnd;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => User::CUSTOMER
        ]);
    
        $user->sendEmailVerificationNotification();
    
        return response()->json([
            'message' => 'User registered successfully. Please verify your email.',
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
    
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Authentication failed'], 401);
        }
    
        $user = auth()->user();
    
        if (!$user->hasVerifiedEmail()) {
            return response()->json(['error' => 'Please verify your email before logging in.'], 403);
        }
    
        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
        ]);
    }
    

    public function refresh()
    {
        try {
            $newToken = JWTAuth::parseToken()->refresh();
            return response()->json([
                'token' => $newToken,
                'token_type' => 'bearer',
                'expires_in' => auth('api')->factory()->getTTL() * 60,
            ]);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Invalid refresh token'], 401);
        }
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken(), true);
        return response()->json(['message' => 'Successfully logged out'],200);
    }

    public function me()
    {
        $user = auth()->user();
    
        $user->load([
            'serviceProvider',
        ]);
    
        return response()->json($user);
    }
    

}
