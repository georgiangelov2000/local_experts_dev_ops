<?php

namespace App\Repositories;

use App\Models\ServiceProvider;
use App\Models\Category;
use App\Models\City;
use App\Models\ServiceCategory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class ServiceProviderRepository
{
    public function findWithRelations(string $alias): ?ServiceProvider
    {
        return ServiceProvider::with([
            'user:id,email',
            'serviceCategory:id,category_id,alias,name',
            'media',
            'category:id,name,alias',
            'projects',
            'workspaces.city:id,name',
            'certifications',
            'contact'
        ])
        ->withCount([
            'likes',
            'dislikes',
            'reviews',
        ])
        ->where('alias', $alias)
        ->first();
    }

    public function getPaginatedProviders(array $filters = [], array $sorting = [], int $perPage = 20, int $page = 1): LengthAwarePaginator
    {
        $query = $this->buildProviderQuery($filters, $sorting);
        
        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    public function getRelatedProviders(ServiceProvider $provider, int $limit = 5): Collection
    {
        return ServiceProvider::with(['user', 'serviceCategory', 'media'])
            ->where('category_id', $provider->category_id)
            ->where('id', '!=', $provider->id)
            ->limit($limit)
            ->get();
    }

    public function getRelatedProvidersCount(ServiceProvider $provider): int
    {
        return ServiceProvider::where('category_id', $provider->category_id)
            ->where('id', '!=', $provider->id)
            ->count();
    }


    public function incrementViews(ServiceProvider $provider): void
    {
        $provider->increment('views');
    }

    public function getCategories(): Collection
    {
        return Category::select('id', 'name', 'alias')
            ->withCount('serviceProviders')
            ->get();
    }

    public function getCities(): Collection
    {
        return City::select('id', 'name', 'alias')->get();
    }

    public function getServiceCategoriesByCategory(int $categoryId): Collection
    {
        return ServiceCategory::where('category_id', $categoryId)->get();
    }

    private function buildProviderQuery(array $filters, array $sorting): Builder
    {
        $query = ServiceProvider::select([
            'id',
            'user_id',
            'business_name',
            'category_id',
            'service_category_id',
            'start_time',
            'stop_time',
            'description',
            'alias',
            'contact_id',
            'views'
        ])->with([
            'user:id',
            'serviceCategory',
            'media',
            'workspaces.city:id,name',
            'contact'
        ])->withCount([
            'likes',
            'dislikes',
            'reviews'
        ]);

        $this->applyFilters($query, $filters);
        $this->applySorting($query, $sorting);

        return $query;
    }

    private function applyFilters(Builder $query, array $filters): void
    {
        if (!empty($filters['category_alias'])) {
            $category = Category::where('alias', $filters['category_alias'])->first();
            if ($category) {
                $query->where('category_id', $category->id);
            }
        }

        if (!empty($filters['city_alias'])) {
            $aliases = explode(',', $filters['city_alias']);
            $query->whereHas('workspaces.city', function ($q) use ($aliases) {
                $q->whereIn('alias', $aliases);
            });
        }

        if (!empty($filters['service_category_alias'])) {
            $serviceCategory = ServiceCategory::where('alias', $filters['service_category_alias'])->first();
            if ($serviceCategory) {
                $query->where('alias', $filters['service_category_alias']);
            }
        }

        if (!empty($filters['term'])) {
            $term = $filters['term'];
            $query->where(function ($q) use ($term) {
                $q->where('business_name', 'LIKE', "%{$term}%")
                    ->orWhere('description', 'LIKE', "%{$term}%");
            });
        }
    }

    private function applySorting(Builder $query, array $sorting): void
    {
        if (!empty($sorting['sort'])) {
            switch ($sorting['sort']) {
                case 'promoted':
                    $query->orderBy('is_promoted', 'desc');
                    break;
                case 'reviews_desc':
                    $query->orderBy('reviews_count', 'desc');
                    break;
                case 'reviews_asc':
                    $query->orderBy('reviews_count', 'asc');
                    break;
                case 'views_desc':
                    $query->orderBy('views', 'desc');
                    break;
                case 'views_asc':
                    $query->orderBy('views', 'asc');
                    break;
            }
        }
    }
} 