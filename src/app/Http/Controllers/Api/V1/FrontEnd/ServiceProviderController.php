<?php

namespace App\Http\Controllers\Api\V1\FrontEnd;

use App\Http\Controllers\Controller;
use App\Models\Favourite;
use App\Services\ServiceProviderService;
use App\Services\ReviewService;
use Illuminate\Http\Request;


class ServiceProviderController extends Controller
{
    public function __construct(
        private ServiceProviderService $providerService,
        private ReviewService $reviewService
    ) {}

    /**
     * List service providers + categories.
     */
    public function index(Request $request)
    {
        $data = $this->providerService->getPaginatedProviders($request);
        return response()->json($data, 200);
    }

    /**
     * Show a specific service provider + related providers + reviews.
     */
    public function show(string $alias, int $page)
    {
        try {
            $data = $this->providerService->getProviderDetails($alias, $page);
            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], $e->getCode() ?: 404);
        }
    }


    /**
     * Create a review for a service provider
     */
    public function createReview(Request $request)
    {
        $validated = $request->validate([
            'review_text' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'consumer_id' => 'nullable|integer|exists:users,id',
            'service_provider_id' => 'required|integer|exists:service_providers,id',
        ]);

        try {
            $review = $this->reviewService->createReview($validated);
            return response()->json($review->toArray(), 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Update a review
     */
    public function updateReview(Request $request, $id)
    {
        $validated = $request->validate([
            'review_text' => 'sometimes|required|string',
            'rating' => 'sometimes|required|integer|min:1|max:5',
        ]);

        try {
            $review = $this->reviewService->updateReview($id, $validated, auth()->id());
            return response()->json(['message' => 'Review updated successfully.', 'review' => $review->toArray()], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }

    public function deleteReview($id)
    {
        try {
            $this->reviewService->deleteReview($id, auth()->id());
            return response()->json(['message' => 'Review deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }

    public function createFavourites(Request $request)
    {
        $request->validate([
            'service_provider_id' => 'required|exists:service_providers,id',
        ]);

        $favourite = Favourite::firstOrCreate([
            'user_id' => $request->user()->id,
            'service_provider_id' => $request->service_provider_id,
        ]);

        return response()->json([
            'message' => 'Added to favourites.',
            'favourite' => $favourite
        ], 201);
    }

    public function removeFavourites(Request $request, $providerId)
    {
        $deleted = Favourite::where('user_id', $request->user()->id)
            ->where('service_provider_id', $providerId)
            ->delete();

        if ($deleted) {
            return response()->json(['message' => 'Removed from favourites.'], 200);
        }

        return response()->json(['message' => 'Not found in favourites.'], 404);
    }

    public function getFavourites()
    {
        $favourites = auth()->user()->favourites()->with('serviceProvider')->get();
        return response()->json(['favourites' => $favourites], 200);
    }

    /**
     * Like a service provider.
     */
    public function like(Request $request, $providerId)
    {
        $provider = ServiceProvider::findOrFail($providerId);

        // Ако вече е харесал, не правим нищо
        if ($request->user()->likes()->where('service_provider_id', $providerId)->exists()) {
            return response()->json(['message' => 'Already liked.'], 200);
        }

        // Премахваме дислайк ако има
        $request->user()->dislikes()->where('service_provider_id', $providerId)->delete();

        // Добавяме лайк
        $request->user()->likes()->create([
            'service_provider_id' => $providerId
        ]);

        // По избор: увеличи брояча
        $provider->increment('likes_count');

        return response()->json(['message' => 'Liked successfully.'], 200);
    }

    /**
     * Dislike a service provider.
     */
    public function dislike(Request $request, $providerId)
    {
        $provider = ServiceProvider::findOrFail($providerId);

        if ($request->user()->dislikes()->where('service_provider_id', $providerId)->exists()) {
            return response()->json(['message' => 'Already disliked.'], 200);
        }

        $request->user()->likes()->where('service_provider_id', $providerId)->delete();

        $request->user()->dislikes()->create([
            'service_provider_id' => $providerId
        ]);

        $provider->increment('dislikes_count');

        return response()->json(['message' => 'Disliked successfully.'], 200);
    }

    /**
     * Increment views for a service provider.
     */
    public function incrementViews(Request $request, $alias)
    {
        $provider = ServiceProvider::where('alias', $alias)->firstOrFail();
        $provider->increment('views');
        return response()->json(['message' => 'Views incremented successfully.'], 200);
    }

    public function getProvidersByIds(Request $request)
    {
        $ids = $request->input('ids', []);
        if (!is_array($ids) || empty($ids)) {
            return response()->json(['providers' => []], 200);
        }
        $data = $this->providerService->getProvidersByIds($ids);
        return response()->json($data, 200);
    }
}
