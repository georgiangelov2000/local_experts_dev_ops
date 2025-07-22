<?php

namespace App\Http\Controllers\Api\V1\BackEnd;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\Backend\LoginRequest;
use App\Http\Requests\Backend\RegisterRequest;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            $credentials = $request->validated();

            $user = User::create([
                'email' => $credentials['email'],
                'password' => Hash::make($credentials['password']),
                'role_id' => $credentials['role_id'],
            ]);

            $token = JWTAuth::fromUser($user);

            return response()->json([
                'success' => true,
                'message' => 'User registered successfully',
                'user' => $user,
                'token' => $token,
                'token_type' => 'bearer',
                'expires_in' => JWTAuth::factory()->getTTL() * 60, // in seconds
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Registration failed',
                'message' => 'An error occurred during registration process'
            ], 500);
        }
    }

    // Login user and return JWT token
    public function login(LoginRequest $request)
    {
        try {
            $credentials = $request->validated();

            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'error' => 'Authentication failed',
                    'message' => 'Invalid credentials provided'
                ], 401);
            }

            $user = auth()->user();
            $user->last_logged_in = now();
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'token' => $token,
                'token_type' => 'bearer',
                'expires_in' => JWTAuth::factory()->getTTL() * 60, // in seconds
                'user' => $user
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Login failed',
                'message' => 'An error occurred during login process'
            ], 500);
        }
    }

    // Logout user (invalidate token)
    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json([
                'success' => true,
                'message' => 'Successfully logged out'
            ], 200);

        } catch (JWTException $e) {
            return response()->json([
                'error' => 'Logout failed',
                'message' => 'Failed to logout, please try again.'
            ], 500);
        }
    }

    // Get authenticated user
    public function me()
    {
        return response()->json(auth()->user(),200);
    }
}
