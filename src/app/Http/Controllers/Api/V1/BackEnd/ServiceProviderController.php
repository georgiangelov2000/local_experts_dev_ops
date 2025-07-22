<?php
namespace App\Http\Controllers\Api\V1\BackEnd;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceProviderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = User::with(['serviceProvider.media', 'media'])->whereIn('role_id', [2, 3]);

        // ✅ Filters
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('email', 'like', "%{$search}%")
                    ->orWhere('id', 'like', "%{$search}%");
            });
        }

        if ($categoryFilter = $request->input('category')) {
            $query->whereHas('serviceProvider.category', function ($q) use ($categoryFilter) {
                $q->where('id', $categoryFilter);
            });
        }

        if ($serviceCategoryFilter = $request->input('service_category')) {
            $query->whereHas('serviceProvider.serviceCategory', function ($q) use ($serviceCategoryFilter) {
                $q->where('id', $serviceCategoryFilter);
            });
        }

        if ($workstationFilter = $request->input('workstation')) {
            $query->whereHas('serviceProvider.workspaces', function ($q) use ($workstationFilter) {
                $q->where('id', $workstationFilter);
            });
        }

        if ($verifiedFilter = $request->input('verified')) {
            $verifiedFilter === 'yes'
                ? $query->whereNotNull('email_verified_at')
                : $query->whereNull('email_verified_at');
        }

        if ($lastLoggedInFilter = $request->input('last_logged_in')) {
            $lastLoggedInFilter === 'yes'
                ? $query->whereNotNull('last_logged_in')
                : $query->whereNull('last_logged_in');
        }

        if ($ratingFilter = $request->input('rating')) {
            $query->whereHas('serviceProvider', function ($q) use ($ratingFilter) {
                $q->whereHas('reviews', function ($q2) use ($ratingFilter) {
                    $q2->havingRaw('AVG(rating) >= ?', [$ratingFilter]);
                });
            });
        }

        // ✅ Sorting
        $query->orderBy('id', 'desc');

        // ✅ Pagination (Laravel-style)
        $perPage = $request->input('per_page', 10);
        $users = $query->paginate($perPage);

        // ✅ Format response
        $data = $users->getCollection()->map(function ($user) {
            $isServiceProvider = $user->role_id == User::SERVICE_PROVIDER;
            $mediaUrl = null;

            if ($isServiceProvider && $user->serviceProvider && $user->serviceProvider->media->count() > 0) {
                $mediaModel = $user->serviceProvider->media->first();
                $mediaUrl = url('/storage/' . ltrim($mediaModel->file_path, '/'));
            } elseif ($user->media && $user->media->count() > 0) {
                $mediaModel = $user->media->first();
                $mediaUrl = url('/storage/' . ltrim($mediaModel->file_path, '/'));
            }

            return [
                'id' => $user->id,
                'email' => $user->email,
                'role_id' => $user->role_id,
                'email_verified_at' => $user->email_verified_at,
                'last_logged_in' => $user->last_logged_in,
                'media' => $mediaUrl,
                'service_provider' => $isServiceProvider && $user->serviceProvider
                    ? [
                        'id' => $user->serviceProvider->id,
                        'business_name' => $user->serviceProvider->business_name,
                        'service_category' => $user->serviceProvider->serviceCategory->name ?? null,
                        'category' => $user->serviceProvider->category->name ?? null,
                        'start_date' => $user->serviceProvider->start_date,
                        'end_date' => $user->serviceProvider->end_date,
                        'rating' => $user->serviceProvider->rating(),
                        'workspaces' => $user->serviceProvider->workspaces->count() > 0
                            ? $user->serviceProvider->workspaces->map(function ($workspace) {
                                return $workspace->city->name;
                            })->implode(', ')
                            : '',
                    ]
                    : null,
            ];
        });

        // ✅ Return paginated response with meta
        return response()->json([
            'data' => $data,
            'current_page' => $users->currentPage(),
            'last_page' => $users->lastPage(),
            'per_page' => $users->perPage(),
            'total' => $users->total(),
        ]);
    }

    /**
     * Store a newly created service provider in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Logic to create a new service provider
        return response()->json(['message' => 'Service provider created successfully']);
    }

    /**
     * Display the specified service provider.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        // Logic to fetch and return a specific service provider
        return response()->json(['message' => 'Service provider details', 'id' => $id]);
    }

    /**
     * Update the specified service provider in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        // Logic to update a specific service provider
        return response()->json(['message' => 'Service provider updated successfully', 'id' => $id]);
    }

    /**
     * Remove the specified service provider from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        // Logic to delete a specific service provider
        return response()->json(['message' => 'Service provider deleted successfully', 'id' => $id]);
    }
}