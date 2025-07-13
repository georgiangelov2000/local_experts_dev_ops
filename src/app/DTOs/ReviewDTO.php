<?php

namespace App\DTOs;

use App\Models\Review;

class ReviewDTO
{
    public function __construct(
        public readonly int $id,
        public readonly string $review_text,
        public readonly string $created_at,
        public readonly string $updated_at,
        public readonly ?string $service_provider_name,
        public readonly ?string $consumer_email,
        public readonly int $rating
    ) {}

    public static function fromModel(Review $review): self
    {
        return new self(
            id: $review->id,
            review_text: $review->review_text,
            created_at: $review->created_at,
            updated_at: $review->updated_at,
            service_provider_name: $review->serviceProvider?->business_name,
            consumer_email: $review->consumer?->email,
            rating: $review->rating
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'review_text' => $this->review_text,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'service_provider_name' => $this->service_provider_name,
            'consumer_email' => $this->consumer_email,
            'rating' => $this->rating
        ];
    }
} 