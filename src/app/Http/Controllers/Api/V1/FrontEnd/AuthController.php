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
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => User::CUSTOMER
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Authentication failed'], 401);
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
        return response()->json(auth()->user());
    }

}
