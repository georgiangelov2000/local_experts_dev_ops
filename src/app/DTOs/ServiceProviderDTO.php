<?php

namespace App\DTOs;

use App\Models\ServiceProvider;

class ServiceProviderDTO
{
    public function __construct(
        public readonly int $id,
        public readonly string $business_name,
        public readonly ?string $description,
        public readonly ?string $service_category,
        public readonly ?string $start_time,
        public readonly ?string $stop_time,
        public readonly string $alias,
        public readonly string $email,
        public readonly array $media,
        public readonly array $projects,
        public readonly array $services,
        public readonly ?float $final_grade,
        public readonly array $workspaces,
        public readonly array $certifications,
        public readonly array $contact,
        public readonly int $likes_count,
        public readonly int $dislikes_count,
        public readonly int $reviews_count,
        public readonly int $views_count,
    ) {}

    public static function fromModel(ServiceProvider $provider): self
    {
        $descriptionFile = storage_path('app/public/descriptions/description_' . $provider->id . '.html');
        $description = file_exists($descriptionFile) ? file_get_contents($descriptionFile) : null;
        return new self(
            id: $provider->id,
            business_name: $provider->business_name,
            description: $description,
            service_category: $provider->serviceCategory?->name,
            start_time: $provider->start_time,
            stop_time: $provider->stop_time,
            alias: $provider->alias,
            email: $provider->user->email,
            media: self::mapMedia($provider->media),
            projects: self::mapProjects($provider->projects),
            services: self::mapServices($provider->services),
            final_grade: $provider->reviews_count > 0 ? round($provider->reviews()->avg('rating'), 2) : null,
            workspaces: self::mapWorkspaces($provider->workspaces),
            certifications: $provider->certifications->map(function($certification) {
                return [
                    'id' => $certification->id,
                    'name'=> $certification->name,
                    'description' => $certification->description,
                    'image' => $certification->media()->first()
                ];
            })->toArray(),
            contact: self::mapContact($provider->contact),
            likes_count: $provider->likes_count,
            dislikes_count: $provider->dislikes_count,
            reviews_count: $provider->reviews_count,
            views_count: $provider->views,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'business_name' => $this->business_name,
            'description' => $this->description,
            'service_category' => $this->service_category,
            'start_time' => $this->start_time,
            'stop_time' => $this->stop_time,
            'alias' => $this->alias,
            'email' => $this->email,
            'media' => $this->media,
            'projects' => $this->projects,
            'services' => $this->services,
            'final_grade' => $this->final_grade,
            'workspaces' => $this->workspaces,
            'certifications' => $this->certifications,
            'contact' => $this->contact,
            'likes_count' => $this->likes_count,
            'dislikes_count' => $this->dislikes_count,
            'reviews_count' => $this->reviews_count,
            'views_count' => $this->views_count,
        ];
    }

    private static function mapMedia($media): array
    {
        return $media->map(function ($mediaItem) {
            return [
                'url' => config('app.url') . '/' . 'storage/' . ltrim($mediaItem->file_path, '/'),
            ];
        })->toArray();
    }

    private static function mapProjects($projects): array
    {
        return $projects->map(function ($projectItem) {
            return [
                'project_name' => $projectItem->project_name,
                'description' => $projectItem->description,
                'date_start' => $projectItem->date_start,
                'date_end' => $projectItem->date_end,
            ];
        })->toArray();
    }

    private static function mapServices($services): array
    {
        return $services->map(function ($serviceItem) {
            return [
                'price' => $serviceItem->price,
                'description' => $serviceItem->description,
            ];
        })->toArray();
    }

    private static function mapWorkspaces($workspaces): array
    {
        return $workspaces?->map(function ($workSpace) {
            return [
                'name' => $workSpace->city?->name
            ];
        })->filter()->values()->toArray() ?? [];
    }

    private static function mapContact($contact): array
    {
        if (!$contact) {
            return [];
        }

        return [
            'website' => $contact->website,
            'phone' => $contact->phone,
            'email' => $contact->email,
            'address' => $contact->address,
            'facebook' => $contact->facebook,
            'instagram' => $contact->instagram,
        ];
    }
} 