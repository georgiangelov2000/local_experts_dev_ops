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
        $mappedUser = [
            'id' => $user->id,
            'email' => $user->email,
            'type' => $type,
        ];

        

        if ($type === 'provider') {
            $provider = $user->serviceProvider()->with([
                'projects',
                'services',
                'reviews',
                'serviceCategory'
            ])->first();

            if ($provider) {
                $mappedUser['service_provider'] = [
                    'business_name' => $provider->business_name ?? null,
                    'alias' => $provider->alias ?? null,
                    'start_date' => $provider->start_time ?? null,
                    'end_date' => $provider->stop_time ?? null,
                    'category' => $provider->serviceCategory->name ?? null,
                    'projects' => $provider->projects->pluck('name'),
                    'services' => $provider->services->pluck('name'),
                    'reviews' => $provider->reviews->map(function ($review) {
                        return [
                            'rating' => $review->rating,
                            'comment' => $review->comment,
                        ];
                    }),
                ];
            } else {
                $mappedUser['service_provider'] = null;
            }
        } else {
            $user->loadMissing([
                'favourites.serviceProvider.user',
                'contacts',
                'likes',
                'dislikes',
            ]);

            $favouriteIds = [];
            $likeIds = [];
            $dislikeIds = [];

            $mappedUser['favourites'] = $user->favourites->map(function ($favourite) use (&$favouriteIds) {
                $provider = $favourite->serviceProvider;
                $locations = $provider->workspaces->map(function ($workspace) {
                    return $workspace->city?->name;
                })->filter()->values(); // remove nulls and reset indexes

                $favouriteIds[] = $provider->id;

                return [
                    'business_name' => $provider->business_name,
                    'start_time' => $provider->start_time,
                    'stop_time' => $provider->stop_time,
                    'alias' => $provider->alias,
                    'service_category' => $provider->serviceCategory->name,
                    'description' => $provider->description,
                    'media' => $provider->media->first() ?? [],
                    'likes_count' => $provider->likes_count,
                    'dislikes_count' => $provider->dislikes_count,
                    'reviews_count' => $provider->reviews_count,
                    'final_grade' => $provider->rating(),
                    'locations' => $locations
                ];
            })->toArray();

            $mappedUser['likes'] = $user->likes->map(function ($like) use (&$likeIds) {
                $provider = $like->serviceProvider;
                $locations = $provider->workspaces->map(function ($workspace) {
                    return $workspace->city?->name;
                })->filter()->values(); // remove nulls and reset indexes

                $likeIds[] = $provider->id;

                return [
                    'business_name' => $provider->business_name,
                    'start_time' => $provider->start_time,
                    'stop_time' => $provider->stop_time,
                    'alias' => $provider->alias,
                    'service_category' => $provider->serviceCategory->name,
                    'description' => $provider->description,
                    'media' => $provider->media->first() ?? [],
                    'likes_count' => $provider->likes_count,
                    'dislikes_count' => $provider->dislikes_count,
                    'reviews_count' => $provider->reviews_count,
                    'final_grade' => $provider->rating(),
                    'locations' => $locations
                ];
            })->toArray();

            $mappedUser['dislikes'] = $user->dislikes->map(function ($dislike) use (&$dislikeIds) {
                $provider = $dislike->serviceProvider;
                $locations = $provider->workspaces->map(function ($workspace) {
                    return $workspace->city?->name;
                })->filter()->values(); // remove nulls and reset indexes

                $dislikeIds[] = $provider->id;

                return [
                    'business_name' => $provider->business_name,
                    'start_time' => $provider->start_time,
                    'stop_time' => $provider->stop_time,
                    'alias' => $provider->alias,
                    'service_category' => $provider->serviceCategory->name,
                    'description' => $provider->description,
                    'media' => $provider->media->first() ?? [],
                    'likes_count' => $provider->likes_count,
                    'dislikes_count' => $provider->dislikes_count,
                    'reviews_count' => $provider->reviews_count,
                    'final_grade' => $provider->rating(),
                    'locations' => $locations
                ];
            })->toArray();


            $mappedUser['contacts'] = $user->contacts->map(function ($contact) {
                return [
                    'phone' => $contact->phone,
                    'email' => $contact->email,
                    'facebook' => $contact->facebook,
                    'instagram' => $contact->instagram,
                    'website' => $contact->website,
                ];
            })->toArray();

            $mappedUser['like_ids'] = $likeIds;
            $mappedUser['dislike_ids'] = $dislikeIds;
        }

        $mappedUser['favourite_ids'] = $favouriteIds;

        return response()->json($mappedUser, 200);
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

    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->stateless()->redirect()->getTargetUrl();
    }

    public function handleProviderCallback($provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->user();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to authenticate with ' . $provider], 500);
        }

        $user = User::firstOrCreate(
            ['email' => $socialUser->getEmail()],
            ['name' => $socialUser->getName(), 'password' => bcrypt(str_random(16))]
        );

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
        ], 200);
    }
}