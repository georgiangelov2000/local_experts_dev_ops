<?php

namespace App\Http\Controllers\Api\V1\FrontEnd;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Models\User;
use Password;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->type,
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
        return response()->json(['message' => 'Successfully logged out'], 200);
    }

    public function me()
    {
        $user = auth()->user();
        $type = ($user->role_id === User::SERVICE_PROVIDER) ? 'provider' : 'user';
        return response()->json([
            'id' => $user->id,
            'email' => $user->email,
            'type' => $type,
            'provider' => 'facebook',
            'provider_id' => '32',
            'social_name' => 'Georgi Angelov',
        ], 200);
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

    public function changePassword(ChangePasswordRequest $request)
    {
        $user = auth()->user();
        // Check current password
        if (!\Hash::check($request->currentPassword, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect.'], 422);
        }
        $user->password = \Hash::make($request->newPassword);
        $user->save();
        return response()->json(['message' => 'Password changed successfully.'], 200);
    }

    public function redirectToProvider($provider)
    {
        // Redirect the user to the provider's OAuth page
        return Socialite::driver($provider)->stateless()->redirect();
    }

    public function handleProviderCallback($provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->user();
        } catch (\Exception $e) {
            return $this->socialitePopupResponse([
                'error' => 'Failed to authenticate with ' . $provider,
                'email_exists' => null
            ]);
        }

        $email = $socialUser->getEmail();
        $existingUser = User::where('email', $email)->first();

        if ($existingUser) {
            return $this->socialitePopupResponse([
                'error' => 'Email already registered. Please log in or use another provider.',
                'email_exists' => true
            ]);
        }

        // Return social profile data for pre-filling registration form
        return $this->socialitePopupResponse([
            'email_exists' => false,
            'profile' => [
                'email' => $email,
                'name' => $socialUser->getName(),
                'avatar' => $socialUser->getAvatar(),
                'provider' => $provider
            ]
        ]);
    }

    private function socialitePopupResponse($data)
    {
        $json = json_encode($data);
        return response()->make(
            '<!DOCTYPE html><html><head><title>Social Login</title></head><body>' .
            '<script>' .
            'if (window.opener) {' .
            '  window.opener.postMessage(' . $json . ', "' . config('app.url') . '");' .
            '  window.close();' .
            '} else {' .
            '  document.body.innerText = "You can close this window.";' .
            '}' .
            '</script>' .
            '</body></html>',
            200,
            ['Content-Type' => 'text/html']
        );
    }
}