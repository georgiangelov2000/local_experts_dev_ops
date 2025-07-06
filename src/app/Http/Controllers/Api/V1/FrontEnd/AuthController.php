<?php

namespace App\Http\Controllers\Api\V1\FrontEnd;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Password;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

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
    
        // if (!$user->hasVerifiedEmail()) {
        //     return response()->json(['error' => 'Please verify your email before logging in.'], 403);
        // }
    
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
        $provider = $user->serviceProvider;
        if ($provider) {
            $provider->projects = $provider->projects()->get() ?? [];
            $provider->services = $provider->services()->get() ?? [];
            $provider->reviews = $provider->reviews()->get() ?? [];
            $provider->service_category = $provider->serviceCategory()->first() ?? null;
        } else {
            $provider = null;
        }
    
        $user->service_provider = $provider;
    
        return response()->json($user);
    }
    
    public function forgotPassword(Request $request)
{
    $request->validate(['email' => 'required|email']);

    $status = Password::sendResetLink(
        $request->only('email')
    );

    return $status === Password::RESET_LINK_SENT
        ? response()->json(['message' => 'Reset link sent.'], 200)
        : response()->json(['message' => __($status)], 400);
}

public function resetPassword(Request $request)
{
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|min:8|confirmed',
    ]);

    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) {
            $user->forceFill([
                'password' => bcrypt($password)
            ])->save();
        }
    );

    return $status === Password::PASSWORD_RESET
        ? response()->json(['message' => 'Password reset successfully.'], 200)
        : response()->json(['message' => __($status)], 400);
}

}
