<?php

namespace App\Services;

use App\DTOs\ReviewDTO;
use App\DTOs\ServiceProviderDTO;
use App\Repositories\ServiceProviderRepository;
use App\Repositories\ReviewRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class ServiceProviderService
{
    public function __construct(
        private ServiceProviderRepository $providerRepository,
        private ReviewRepository $reviewRepository
    ) {}

    public function getProviderByAlias(string $alias): ?ServiceProviderDTO
    {
        $provider = $this->providerRepository->findWithRelations($alias);
        
        if (!$provider) {
            return null;
        }

        return ServiceProviderDTO::fromModel($provider);
    }

    public function getPaginatedProviders(Request $request): array
    {
        $filters = $this->extractFilters($request);
        $sorting = $this->extractSorting($request);
        $perPage = $request->get('per_page', 20);
        $page = max(1, (int) $request->get('page', 1));

        $providers = $this->providerRepository->getPaginatedProviders($filters, $sorting, $perPage, $page);
        
        return [
            'service_providers' => $this->mapProvidersForList($providers->getCollection()),
            'categories' => $this->providerRepository->getCategories(),
            'cities' => $this->providerRepository->getCities(),
            'service_provider_categories' => $this->getServiceCategoriesForFilter($filters),
            'filtered' => $this->getFilteredNames($filters),
            'filters' => $this->getFilterParams($request),
            'pagination' => [
                'current_page' => $providers->currentPage(),
                'per_page' => $providers->perPage(),
                'total' => $providers->total(),
                'last_page' => $providers->lastPage(),
            ]
        ];
    }


    public function getProviderDetails(string $alias, int $page = 1): array
    {
        $provider = $this->providerRepository->findWithRelations($alias);
        
        if (!$provider) {
            throw new \Exception('Service provider not found', 404);
        }

        $reviews = $this->reviewRepository->getPaginatedReviewsForProvider($provider->id, 10, $page);
        $relatedProviders = $this->providerRepository->getRelatedProviders($provider, 5);
        $relatedProvidersCount = $this->providerRepository->getRelatedProvidersCount($provider);
        
        // Increment views
        $this->providerRepository->incrementViews($provider);

        return [
            'service_provider' => ServiceProviderDTO::fromModel($provider)->toArray(),
            'reviews' => [
                'data' => $reviews->getCollection()->map(fn($review) => ReviewDTO::fromModel($review)->toArray()),
                'current_page' => $reviews->currentPage(),
                'last_page' => $reviews->lastPage(),
                'per_page' => $reviews->perPage(),
                'total' => $reviews->total(),
            ],
            'related_providers' => $this->mapProvidersForList($relatedProviders),
            'related_providers_count' => $relatedProvidersCount
        ];
    }

    public function getProvidersByIds(array $ids): array
    {
        $providers = $this->providerRepository->findByIds($ids);
        return [
            'providers' => $this->mapProvidersForList($providers)
        ];
    }

    private function extractFilters(Request $request): array
    {
        return [
            'category_alias' => $request->get('category_alias'),
            'city_alias' => $request->get('city_alias'),
            'service_category_alias' => $request->get('service_category_alias'),
            'term' => $request->get('term'),
        ];
    }

    private function extractSorting(Request $request): array
    {
        $sort = $request->get('sort');
        
        // Default to rating count descending if no sort specified
        if (empty($sort)) {
            $sort = 'rating_count_desc';
        }
        
        return [
            'sort' => $sort,
        ];
    }

    private function mapProvidersForList(Collection $providers): array
    {
        return $providers->map(function ($provider) {
            $locations = $provider->workspaces->map(function ($workspace) {
                return $workspace->city?->name;
            })->filter()->values();

            return [
                'id' => $provider->id,
                'business_name' => $provider->business_name,
                'alias' => $provider->alias,
                'service_category' => $provider->serviceCategory->name,
                'media' => $provider->media->first() ?? [],
                'final_grade' => $provider->rating(),
                'locations' => $locations,
                'likes_count' => $provider->likes_count,
                'dislikes_count' => $provider->dislikes_count,
                'reviews_count' => $provider->reviews_count,
                'views_count' => $provider->views,
                'description' => \Str::limit($provider->description, 120),
            ];
        })->toArray();
    }

    private function getServiceCategoriesForFilter(array $filters): Collection
    {
        if (!empty($filters['category_alias'])) {
            // This would need to be implemented based on your category structure
            return collect(); // Placeholder
        }
        
        return collect();
    }

    private function getFilteredNames(array $filters): array
    {
        $filtered = [];
        
        if (!empty($filters['category_alias'])) {
            // This would need to be implemented based on your category structure
            $filtered['category'] = 'Category Name'; // Placeholder
        }

        if (!empty($filters['city_alias'])) {
            // This would need to be implemented based on your city structure
            $filtered['cities'] = 'City Names'; // Placeholder
        }

        if (!empty($filters['service_category_alias'])) {
            // This would need to be implemented based on your service category structure
            $filtered['service_category'] = 'Service Category Name'; // Placeholder
        }

        if (!empty($filters['term'])) {
            $filtered['term'] = $filters['term'];
        }

        return $filtered;
    }

    private function getFilterParams(Request $request): array
    {
        return [
            'city_alias' => $request->get('city_alias') ?? "",
            'category_alias' => $request->get('category_alias') ?? "",
            'service_category_alias' => $request->get('service_category_alias') ?? "",
            'term' => $request->get('term') ?? "",
            'sort' => $request->get('sort') ?? ""
        ];
    }
} 