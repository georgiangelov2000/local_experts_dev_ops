<?php

namespace App\Repositories;

use App\Models\Review;
use Illuminate\Pagination\LengthAwarePaginator;

class ReviewRepository
{
    public function getPaginatedReviewsForProvider(int $providerId, int $perPage = 10, int $page = 1): LengthAwarePaginator
    {
        return Review::with(['serviceProvider:id,business_name', 'consumer:id,email'])
            ->where('service_provider_id', $providerId)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);
    }

    public function createReview(array $data): Review
    {
        return Review::create($data);
    }

    public function findReview(int $id): ?Review
    {
        return Review::find($id);
    }

    public function updateReview(Review $review, array $data): bool
    {
        return $review->update($data);
    }

    public function deleteReview(Review $review): bool
    {
        return $review->delete();
    }

    public function getAverageRatingForProvider(int $providerId): float
    {
        return Review::where('service_provider_id', $providerId)->avg('rating') ?? 0;
    }
} 