<?php

namespace App\Services;

use App\DTOs\ReviewDTO;
use App\Repositories\ReviewRepository;
use Illuminate\Http\Request;

class ReviewService
{
    public function __construct(
        private ReviewRepository $reviewRepository
    ) {}

    public function createReview(array $data): ReviewDTO
    {
        $review = $this->reviewRepository->createReview($data);
        return ReviewDTO::fromModel($review);
    }

    public function updateReview(int $reviewId, array $data, int $userId): ReviewDTO
    {
        $review = $this->reviewRepository->findReview($reviewId);
        
        if (!$review) {
            throw new \Exception('Review not found', 404);
        }

        if ($review->user_id !== $userId) {
            throw new \Exception('Unauthorized', 403);
        }

        $this->reviewRepository->updateReview($review, $data);
        return ReviewDTO::fromModel($review);
    }

    public function deleteReview(int $reviewId, int $userId): bool
    {
        $review = $this->reviewRepository->findReview($reviewId);
        
        if (!$review) {
            throw new \Exception('Review not found', 404);
        }

        if ($review->user_id !== $userId) {
            throw new \Exception('Unauthorized', 403);
        }

        return $this->reviewRepository->deleteReview($review);
    }

    public function getAverageRatingForProvider(int $providerId): float
    {
        return $this->reviewRepository->getAverageRatingForProvider($providerId);
    }
} 