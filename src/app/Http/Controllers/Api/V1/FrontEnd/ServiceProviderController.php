<?php

namespace App\Http\Controllers\Api\V1\FrontEnd;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\City;
use App\Models\Favourite;
use App\Models\Review;
use App\Models\ServiceCategory;
use App\Models\ServiceProvider;
use Illuminate\Http\Request;


class ServiceProviderController extends Controller
{
    /**
     * List service providers + categories.
     */
    public function index(Request $request)
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

        $filtered = [];

        if ($request->has('sort')) {
            switch ($request->get('sort')) {
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
                default:
                    break;
            }
        }

        // Resolve names for applied filters
        $serviceProviderCategories = collect();

        if ($categoryAlias = $request->get('category_alias')) {
            $category = Category::where('alias', $categoryAlias)->first();
            $query->where('category_id', $category->id);
            if ($category) {
                $serviceProviderCategories = ServiceCategory::where('category_id', $category->id)->get();
                $filtered['category'] = $category->name;
            }
        }

        if ($request->has('city_alias')) {
            $aliases = explode(',', $request->get('city_alias'));
            $cities = City::whereIn('alias',$aliases)->pluck('name')->toArray();
            $filtered['cities'] = implode(',',$cities);
            $query->whereHas('workspaces.city', function ($q) use ($aliases) {
                $q->whereIn('alias', $aliases);
            });
        }

        if ($serviceCategoryAlias = $request->get('service_category_alias')) {
            $serviceProviderCategory = ServiceCategory::where('alias',$serviceCategoryAlias)->first();
            $filtered['service_category'] = $serviceProviderCategory->name;
            $query->where('alias', $serviceCategoryAlias);
        }

        if ($request->has('term')) {
            $term = $request->term;
            $filtered['term'] = $term;
            $query->where(function ($q) use ($term) {
                $q->where('business_name', 'LIKE', "%{$term}%")
                    ->orWhere('description', 'LIKE', "%{$term}%");
            });
        }

        // Default values
        $perPage = $request->get('per_page', 20);
        $page = max(1, (int) $request->get('page', 1));
        $offset = ($page - 1) * $perPage;

        // Count total before limit/offset
        $total = $query->count();

        // Fetch data
        $serviceProviders = $query->limit($perPage)->offset($offset)->get();

        $serviceProviders = $serviceProviders->map(function ($provider) {
            $locations = $provider->workspaces->map(function ($workspace) {
                return $workspace->city?->name;
            })->filter()->values(); // remove nulls and reset indexes

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
        });

        $categories = Category::select('id', 'name', 'alias')
            ->withCount('serviceProviders')  // assuming relation name is serviceProviders
            ->get();
        $cities = City::select('id', 'name', 'alias')->get();

        return response()->json([
            'categories' => $categories,
            'cities' => $cities,
            'service_providers' => $serviceProviders,
            'service_provider_categories' => $serviceProviderCategories,
            'filtered' => $filtered,
            'filters' => [
                'city_alias' => $request->get('city_alias') ?? "",
                'category_alias' => $request->get('category_alias') ?? "",
                'service_category_alias' => $request->get('service_category_alias') ?? "",
                'term' => $request->get('term') ?? "",
                'sort' => $request->get('sort') ?? ""
            ],
            "pagination" => [
                'current_page' => $page,
                'per_page' => $perPage,
                'total' => $total,
                'last_page' => ceil($total / $perPage),
            ]
        ], 200);
    }

    /**
     * Show a specific service provider + related providers + reviews.
     */
    public function show(string $alias)
    {
        $provider = ServiceProvider::with([
            'user:id,email',
            'serviceCategory:id,category_id,alias,name',
            'media',
            'category:id,name,alias',
            'reviews.serviceProvider:id,business_name', // load serviceProvider with limited fields
            'reviews.consumer:id,email',
            'projects',
            'workspaces.city:id,name',
            'certifications',
            'contact'
        ])->where('alias', $alias)->first();

        if (!$provider) {
            return response()->json([
                'error' => 'Service provider not found',
            ], 404);
        }

        // Map contact
        $provider->contact = $provider->contact ? [
            'website' => $provider->contact->website,
            'phone' => $provider->contact->phone,
            'email' => $provider->contact->email,
            'address' => $provider->contact->address,
            'facebook' => $provider->contact->facebook,
            'instagram' => $provider->contact->instagram,
        ] : [];

        // Map reviews
        $provider->reviews = $provider->reviews->map(function ($reviewItem) {
            return [
                'review_text' => $reviewItem->review_text,
                'created_at' => $reviewItem->created_at,
                'updated_at' => $reviewItem->updated_at,
                'service_provider_name' => $reviewItem->serviceProvider?->business_name,
                'consumer_email' => $reviewItem->consumer?->email,
                'rating' => $reviewItem->rating
            ];
        });

        // Map media URLs
        $provider->media = $provider->media->map(function ($mediaItem) {
            return [
                'url' => config('app.url') . '/' . 'storage/' . ltrim($mediaItem->file_path, '/'),
            ];
        });

        // Map projects
        $provider->projects = $provider->projects->map(function ($projectItem) {
            return [
                'project_name' => $projectItem->project_name,
                'description' => $projectItem->description,
                'date_start' => $projectItem->date_start,
                'date_end' => $projectItem->date_end,
            ];
        });

        // Map services
        $provider->services = $provider->services->map(function ($serviceItem) {
            return [
                'price' => $serviceItem->price,
                'description' => $serviceItem->description,
            ];
        });

        // Map workspaces (only if exists and has city)
        $provider->workspaces = $provider->workspaces?->map(function ($workSpace) {
            return [
                'name' => $workSpace->city?->name
            ];
        })->filter()->values() ?? collect();

        // Fetch related providers
        $relatedProviders = ServiceProvider::with(['user', 'serviceCategory', 'media'])
            ->where('category_id', $provider->category_id)
            ->where('id', '!=', $provider->id)
            ->limit(5)
            ->get();

        $finalGrade = null;
        if ($provider->reviews->count() > 0) {
            $finalGrade = round(
                $provider->reviews->avg('rating'),
                2
            );
        }

        return response()->json([
            'service_provider' => [
                'business_name' => $provider->business_name,
                'description' => $provider->description,
                'service_category' => $provider->serviceCategory?->name,
                'start_time' => $provider->start_time,
                'stop_time' => $provider->stop_time,
                'alias' => $provider->alias,
                'email' => $provider->user->email,
                'media' => $provider->media,
                'projects' => $provider->projects,
                'services' => $provider->services,
                'reviews' => $provider->reviews,
                'final_grade' => $finalGrade,
                'workspaces' => $provider->workspaces,
                'certifications' => $provider->certifications,
                'contact' => $provider->contact
            ],
            'related_providers' => $relatedProviders,
        ], 200);
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

        $review = Review::create($validated);

        return response()->json($review, 201);
    }

    /**
     * Update a review
     */
    public function updateReview(Request $request, $id)
    {
        $review = Review::findOrFail($id);

        if (auth()->check() && $review->consumer_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized.'], 403);
        }

        $validated = $request->validate([
            'review_text' => 'sometimes|required|string',
            'rating' => 'sometimes|required|integer|min:1|max:5',
        ]);

        $review->update($validated);

        return response()->json(['message' => 'Review updated successfully.', 'review' => $review], 200);
    }
    public function deleteReview($id)
    {
        $review = Review::findOrFail($id);

        if (auth()->check() && $review->consumer_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized.'], 403);
        }

        $review->delete();

        return response()->json(['message' => 'Review deleted successfully.'], 200);
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

}
