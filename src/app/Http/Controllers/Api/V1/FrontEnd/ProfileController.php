<?php

namespace App\Http\Controllers\Api\V1\FrontEnd;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use App\Models\Category;
use App\Models\User;
use App\Models\City;
use App\Models\ServiceCategory;
use App\Models\ServiceProvider;
use App\Models\Media;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    public function profile(ProfileRequest $request)
    {
        $user = auth()->user();

        // if (!$user->hasVerifiedEmail()) {
        //     return response()->json(['error' => 'Please verify your email before logging in.'], 403);
        // }

        $validated = $request->validated();
        $tab = $request->input('tab');

        if ($user->role_id === User::SERVICE_PROVIDER) {
            // Service provider
            $serviceProvider = $user->serviceProvider()->first() ?? new ServiceProvider(['user_id' => $user->id]);

            switch ($tab) {
                case 'basic':
                    $serviceProvider->business_name = $validated['business_name'];
                    // Save description as a file, not in the DB
                    $descriptionPath = storage_path('app/public/descriptions/description_' . ($serviceProvider->id ?? 'new') . '.html');
                    file_put_contents($descriptionPath, $validated['description']);
                    $serviceProvider->category_id = (int) $validated['category_id'];
                    $serviceProvider->service_category_id = (int) $validated['service_category_id'];
                    $serviceProvider->start_time = Carbon::now();
                    $serviceProvider->stop_time = Carbon::now()->addMonth();
                    $serviceProvider->alias = $this->generateSeoAlias($validated['business_name'], $user->id);
                    $serviceProvider->save();

                    if ($request->hasFile('image')) {
                        $this->replaceBusinessImage($serviceProvider, $request->file('image'));
                    }

                    return response()->json(['message' => 'Basic profile info saved successfully.'], 200);

                case 'projects':
                    if (!empty($validated['projects'])) {
                        foreach ($validated['projects'] as $projectData) {
                            $project = isset($projectData['id'])
                                ? Project::where('id', $projectData['id'])->where('service_provider_id', $serviceProvider->id)->firstOrFail()
                                : new Project(['service_provider_id' => $serviceProvider->id]);

                            $project->project_name = $projectData['project_name'];
                            $project->description = $projectData['description'];
                            $project->status = $projectData['status'];
                            $project->date_start = Carbon::parse($projectData['date_start'])->toDateString();
                            $project->date_end = Carbon::parse($projectData['date_end'])->toDateString();                            
                            $project->save();

                            if (isset($projectData['image'])) {
                                $path = $projectData['image']->store('projects/images', 'public');
                                $this->saveMediaGeneric($project, $path, $projectData['image']->getClientOriginalName(), 'image');
                            }

                            if (isset($projectData['video'])) {
                                $path = $projectData['video']->store('projects/videos', 'public');
                                $this->saveMediaGeneric($project, $path, $projectData['video']->getClientOriginalName(), 'video');
                            }
                        }
                    }
                    return response()->json(['message' => 'Projects saved successfully.'], 200);

                case 'services':
                    if (!empty($validated['services'])) {
                        $incomingIds = collect($validated['services'])
                            ->filter(fn($s) => isset($s['id']))
                            ->pluck('id')
                            ->toArray();
                    
                        // Delete services not in the incoming array
                        $serviceProvider->services()
                            ->whereNotIn('id', $incomingIds)
                            ->delete();
                    
                        foreach ($validated['services'] as $serviceData) {
                            $service = isset($serviceData['id'])
                                ? $serviceProvider->services()->where('id', $serviceData['id'])->first()
                                : $serviceProvider->services()->make();
                    
                            $service->price = $serviceData['price'];
                            $service->description = $serviceData['description'];
                            $service->save();
                        }
                    }
                    return response()->json(['message' => 'Services saved successfully.'], 200);
                case 'certifications':
                    $incomingIds = collect($validated['certifications'])
                        ->filter(fn($c) => isset($c['id']))
                        ->pluck('id')
                        ->toArray();

                    // Delete certifications not in the incoming array
                    $serviceProvider->certifications()
                        ->whereNotIn('id', $incomingIds)
                        ->delete();

                    foreach ($validated['certifications'] as $certData) {
                        $cert = isset($certData['id'])
                            ? $serviceProvider->certifications()->where('id', $certData['id'])->firstOrFail()
                            : $serviceProvider->certifications()->make();

                        $cert->name = $certData['name'];
                        $cert->description = $certData['description'];
                        $cert->link = $certData['link'] ?? null;
                        $cert->save();

                        if (isset($certData['image']) && $certData['image']) {
                            $path = $certData['image']->store('images', 'public');
                            $this->saveMediaGeneric($cert, $path, $certData['image']->getClientOriginalName(), 'image');
                        }
                    }
                    return response()->json(['message' => 'Certifications saved successfully.'], 200);

                case 'contacts':
                    // ServiceProvider and Contact are one-to-one
                    $contactData = [
                        'phone' => $validated['phone'] ?? null,
                        'email' => $validated['email'] ?? null,
                        'facebook' => $validated['facebook'] ?? null,
                        'instagram' => $validated['instagram'] ?? null,
                        'website' => $validated['website'] ?? null,
                        'address' => $validated['address'] ?? null,
                    ];
                    $contact = $serviceProvider->contact()->first();
                    if ($contact) {
                        $contact->update($contactData);
                    } else {
                        $serviceProvider->contact()->create($contactData);
                    }
                    return response()->json(['message' => 'Contacts saved successfully.'], 200);

                // Add more cases for other tabs as needed (e.g., contacts)

                default:
                    return response()->json(['error' => 'Invalid tab'], 400);
            }
        } else {
            // User logic
            switch ($tab) {
                case 'basic':
                    $user->update([
                        'name' => $validated['name'],
                        'avatar' => $validated['avatar'] ?? null,
                    ]);
                    return response()->json(['message' => 'Profile updated successfully.'], 200);
                case 'likes':
                    $providers = $user->likes()->with(['serviceProvider.workspaces.city', 'serviceProvider.serviceCategory', 'serviceProvider.media', 'serviceProvider.services', 'serviceProvider.certifications'])->get()->map(function($like) {
                        $provider = $like->serviceProvider;
                        if (!$provider) return null;
                        $locations = $provider->workspaces->map(function ($workspace) {
                            return $workspace->city?->name;
                        })->filter()->values();
                        return [
                            'id' => $provider->id,
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
                            'views_count' => $provider->views,
                            'final_grade' => $provider->rating(),
                            'locations' => $locations,
                            'services' => $provider->services->map(function ($service) {
                                return [
                                    'description' => $service->description,
                                    'price' => $service->price,
                                ];
                            }),
                            'certifications' => $provider->certifications->map(function ($certification) {
                                return [
                                    'id' => $certification->id,
                                    'name' => $certification->name,
                                    'description' => $certification->description,
                                    'image' => $certification->image,
                                ];
                            }),
                        ];
                    })->filter()->values();
                    return response()->json([
                        'providers' => $providers,
                    ], 200);
                case 'favourites':
                    $providers = $user->favourites()->with(['serviceProvider.workspaces.city', 'serviceProvider.serviceCategory', 'serviceProvider.media', 'serviceProvider.services', 'serviceProvider.certifications'])->get()->map(function($fav) {
                        $provider = $fav->serviceProvider;
                        if (!$provider) return null;
                        $locations = $provider->workspaces->map(function ($workspace) {
                            return $workspace->city?->name;
                        })->filter()->values();
                        return [
                            'id' => $provider->id,
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
                            'views_count' => $provider->views,
                            'final_grade' => $provider->rating(),
                            'locations' => $locations,
                            'services' => $provider->services->map(function ($service) {
                                return [
                                    'description' => $service->description,
                                    'price' => $service->price,
                                ];
                            }),
                            'certifications' => $provider->certifications->map(function ($certification) {
                                return [
                                    'id' => $certification->id,
                                    'name' => $certification->name,
                                    'description' => $certification->description,
                                ];
                            }),
                        ];
                    })->filter()->values();
                    return response()->json([
                        'providers' => $providers,
                    ], 200);
                default:
                    return response()->json(['error' => 'Invalid tab'], 400);
            }
        }
    }

    public function tabData($tab)
    {
        $user = auth()->user();
        if ($user->role_id === User::SERVICE_PROVIDER) {
            $provider = $user->serviceProvider;
            $descriptionFile = storage_path('app/public/descriptions/description_' . $provider->id . '.html');
            $description = file_exists($descriptionFile) ? file_get_contents($descriptionFile) : null;
            switch ($tab) {
                case 'basic':
                    return response()->json([
                        'id' => $user->id,
                        'email' => $user->email,
                        'business_name' => $provider->business_name,
                        'description' => $description,
                        'categories' => Category::select('id','name')->get(),
                        'category_id' => $provider->category_id,
                        'service_categories' => ServiceCategory::where('category_id',$provider->category_id)->get(),
                        'service_category_id' => $provider->service_category_id,
                        'cities' => City::all(),
                        'image' => $provider->media->first()
                            ? (config('app.url') . '/storage/' . ltrim($provider->media->first()->file_path, '/'))
                            : null,
                        'workspaces' => $provider->workspaces->map(function ($item) {
                            return $item->city->id;
                        })->toArray(),
                    ],200);
                case 'projects':
                    $projects = $provider->projects()->get()->map(function($project) {
                        $media = $project->media()->where('file_type', 'image')->first();
                        return [
                            'id' => $project->id,
                            'project_name' => $project->project_name,
                            'description' => $project->description,
                            'date_start' => $project->date_start,
                            'date_end' => $project->date_end,
                            'status' => $project->status,
                            'image_url' => $media ? (config('app.url') . '/storage/' . ltrim($media->file_path, '/')) : null,
                            'link' => $project->link ?? null,
                        ];
                    });
                    return response()->json($projects, 200);
                case 'services':
                    $services = $provider ? $provider->services()->select('id', 'description', 'price')->get() : [];
                    return response()->json($services,200);
                case 'reviews':
                    $reviews = $provider ? $provider->reviews()->select('id', 'rating', 'comment', 'created_at')->get() : [];
                    return response()->json($reviews,200);
                case 'certifications':
                    $certifications = $provider ? $provider->certifications()->get()->map(function($certification) {
                        $media = $certification->media()->where('file_type', 'image')->first();
                        return [
                            'id' => $certification->id,
                            'name' => $certification->name,
                            'description' => $certification->description,
                            'link' => $certification->link,
                            'image_file' => $media ? (config('app.url') . '/storage/' . ltrim($media->file_path, '/')) : null,
                        ];
                    }) : [];
                    return response()->json($certifications, 200);
                case 'contacts':
                    $contacts = $provider->contact->first();
                    return response()->json($contacts,200);
                default:
                    return response()->json(['error' => 'Invalid tab'], 400);
            }
        } else {
            // User logic
            switch ($tab) {
                case 'basic':
                    return response()->json([
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'avatar' => $user->avatar,
                    ], 200);
                case 'likes':
                    return response()->json([
                        'likes' => $user->likes()->with('serviceProvider')->get(),
                    ], 200);
                case 'favourites':
                    return response()->json([
                        'favourites' => $user->favourites()->with('serviceProvider')->get(),
                    ], 200);
                default:
                    return response()->json(['error' => 'Invalid tab'], 400);
            }
        }
    }

    public function preview()
    {
        $user = auth()->user();
        $provider = $user->serviceProvider;
        if (!$provider) {
            return response()->json(['error' => 'No provider profile found.'], 404);
        }
        $descriptionFile = storage_path('app/public/descriptions/description_' . $provider->id . '.html');
        $description = file_exists($descriptionFile) ? file_get_contents($descriptionFile) : null;
        return response()->json([
            'id' => $provider->id,
            'business_name' => $provider->business_name,
            'description' => $description,
            'category_id' => $provider->category_id,
            'category' => $provider->category?->name,
            'service_category_id' => $provider->service_category_id,
            'service_category' => $provider->serviceCategory?->name,
            'image' => $provider->media->first()
                ? (config('app.url') . '/storage/' . ltrim($provider->media->first()->file_path, '/'))
                : null,
            'services' => $provider->services->map(function ($service) {
                return [
                    'id' => $service->id,
                    'description' => $service->description,
                    'price' => $service->price,
                ];
            }),
            'projects' => $provider->projects->map(function ($project) {
                return [
                    'id' => $project->id,
                    'project_name' => $project->project_name,
                    'description' => $project->description,
                    'date_start' => $project->date_start,
                    'date_end' => $project->date_end,
                    'status' => $project->status,
                ];
            }),
            'last_logged_in' => $provider->user->last_logged_in ?? null,
            'certifications' => $provider->certifications->map(function ($cert) {
                $media = $cert->media()->where('file_type', 'image')->first();
                return [
                    'id' => $cert->id,
                    'name' => $cert->name,
                    'description' => $cert->description,
                    'link' => $cert->link,
                    'image_file' => $media ? (config('app.url') . '/storage/' . ltrim($media->file_path, '/')) : null,
                ];
            }),
            'contacts' => $provider->contact,
            'workspaces' => $provider->workspaces->map(function ($item) {
                return $item->city->id;
            })->toArray(),
        ], 200);
    }

    public function changePassword(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            'current_password' => 'required',
            'password' => 'required|confirmed|min:6',
        ]);
        if (!\Hash::check($request->current_password, $user->password)) {
            return response()->json(['error' => 'Current password is incorrect.'], 400);
        }
        $user->password = bcrypt($request->password);
        $user->save();
        return response()->json(['message' => 'Password updated successfully.']);
    }

    private function replaceBusinessImage(ServiceProvider $serviceProvider, $file)
    {
        $oldMedia = Media::where('model_id', $serviceProvider->id)
            ->where('model_type', ServiceProvider::class)
            ->where('file_type', 'image')
            ->first();

        if ($oldMedia) {
            \Storage::disk('public')->delete($oldMedia->file_path);
            $oldMedia->delete();
        }

        $path = $file->store('images', 'public');

        Media::create([
            'model_id' => $serviceProvider->id,
            'model_type' => ServiceProvider::class,
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
            'file_type' => 'image',
        ]);
    }

    private function saveMediaGeneric($model, $path, $fileName, $fileType)
    {
        Media::create([
            'model_id' => $model->id,
            'model_type' => get_class($model),
            'file_path' => $path,
            'file_name' => $fileName,
            'file_type' => $fileType,
        ]);
    }

    private function generateSeoAlias($businessName, $userId)
    {
        $slug = Str::slug($businessName);
        return $slug . '-' . $userId;
    }
}
