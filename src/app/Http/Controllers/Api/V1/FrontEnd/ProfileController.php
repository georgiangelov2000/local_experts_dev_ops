<?php

namespace App\Http\Controllers\Api\V1\FrontEnd;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use App\Models\Category;
use App\Models\Certification;
use App\Models\City;
use App\Models\ServiceCategory;
use App\Models\ServiceProvider;
use App\Models\Media;
use App\Models\Project;
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

        // Service provider
        $serviceProvider = $user->serviceProvider()->first() ?? new ServiceProvider(['user_id' => $user->id]);

        switch ($tab) {
            case 'basic':
                $serviceProvider->business_name = $validated['business_name'];
                $serviceProvider->description = $validated['description'];
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
                            ? Project::where('id', $projectData['id'])->where('user_id', $user->id)->firstOrFail()
                            : new Project(['user_id' => $user->id]);

                        $project->project_name = $projectData['project_name'];
                        $project->description = $projectData['description'];
                        $project->status = $projectData['status'];
                        $project->date_start = Carbon::parse($projectData['date_start'])->toDateTimeString();
                        $project->date_end = Carbon::parse($projectData['date_end'])->toDateTimeString();
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
                    foreach ($validated['services'] as $serviceData) {
                        $service = isset($serviceData['id'])
                            ? $serviceProvider->services()->where('id', $serviceData['id'])->firstOrFail()
                            : $serviceProvider->services()->make();

                        $service->price = $serviceData['price'];
                        $service->description = $serviceData['description'];
                        $service->save();
                    }
                }
                return response()->json(['message' => 'Services saved successfully.'], 200);

            case 'certifications':
                if (!empty($validated['certifications'])) {
                    foreach ($validated['certifications'] as $certData) {
                        $cert = isset($certData['id'])
                            ? $serviceProvider->certifications()->where('id', $certData['id'])->firstOrFail()
                            : $serviceProvider->certifications()->make();

                        $cert->name = $certData['name'];
                        $cert->description = $certData['description'];
                        $cert->save();

                        if (isset($certData['image'])) {
                            $path = $certData['image']->store('images', 'public');
                            $this->saveMediaGeneric($cert, $path, $certData['image']->getClientOriginalName(), 'image');
                        }
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
    }

    public function tabData($tab)
    {
        $user = auth()->user();
        $provider = $user->serviceProvider;
        switch ($tab) {
            case 'basic':
                return response()->json([
                    'id' => $user->id,
                    'email' => $user->email,
                    'business_name' => $provider->business_name,
                    'description' => $provider->description,
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
                $projects = $provider->projects()->select('id', 'project_name', 'description', 'date_start', 'date_end', 'status')->get();
                return response()->json($projects,200);
            case 'services':
                $services = $provider ? $provider->services()->select('id', 'description', 'price')->get() : [];
                return response()->json($services,200);
            case 'reviews':
                $reviews = $provider ? $provider->reviews()->select('id', 'rating', 'comment', 'created_at')->get() : [];
                return response()->json($reviews,200);
            case 'certifications':
                $certifications = $provider ? $provider->certifications()->select('id', 'name', 'description')->get() : [];
                return response()->json($certifications, 200);
            case 'contacts':
                $contacts = $provider->contact->first();
                return response()->json($contacts,200);
            default:
                return response()->json(['error' => 'Invalid tab'], 400);
        }
    }

    public function preview()
    {
        $user = auth()->user();
        $provider = $user->serviceProvider;
        if (!$provider) {
            return response()->json(['error' => 'No provider profile found.'], 404);
        }
        return response()->json([
            'id' => $provider->id,
            'business_name' => $provider->business_name,
            'description' => $provider->description,
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
            'certifications' => $provider->certifications->map(function ($cert) {
                return [
                    'id' => $cert->id,
                    'name' => $cert->name,
                    'description' => $cert->description,
                ];
            }),
            'contacts' => $provider->contact,
            'workspaces' => $provider->workspaces->map(function ($item) {
                return $item->city->id;
            })->toArray(),
        ], 200);
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
