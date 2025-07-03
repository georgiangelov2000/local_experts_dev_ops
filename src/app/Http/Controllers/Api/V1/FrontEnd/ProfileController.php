<?php

namespace App\Http\Controllers\Api\V1\FrontEnd;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use App\Models\ServiceProvider;
use App\Models\Media;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Str;

class ProfileController extends Controller
{
    public function profile(ProfileRequest $request)
    {
        $user = $request->user();
        if (!$user->hasVerifiedEmail()) {
            return response()->json(['error' => 'Please verify your email before logging in.'], 403);
        }

        $validated = $request->validated();

        // Service provider
        $serviceProvider = $user->serviceProvider()->first();

        if (!$serviceProvider) {
            $serviceProvider = new ServiceProvider();
            $serviceProvider->user_id = $user->id;
        }

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

        $responseProjects = [];

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

                if (isset($projectData['image'])) {
                    $path = $projectData['image']->store('projects/images', 'public');
                    $this->saveMedia($project, $path, $projectData['image']->getClientOriginalName(), 'image');
                }

                if (isset($projectData['video'])) {
                    $path = $projectData['video']->store('projects/videos', 'public');
                    $this->saveMedia($project, $path, $projectData['video']->getClientOriginalName(), 'video');
                }

                $project->save();
                $responseProjects[] = $project;
            }
        }

        $responseServices = [];
        if (!empty($validated['services'])) {
            foreach ($validated['services'] as $serviceData) {
                $service = isset($serviceData['id'])
                    ? $serviceProvider->services()->where('id', $serviceData['id'])->firstOrFail()
                    : $serviceProvider->services()->make();

                $service->price = $serviceData['price'];
                $service->description = $serviceData['description'];
                $service->save();

                $responseServices[] = $service;
            }
        }

        // Get business images
        $businessImages = Media::where('model_id', $serviceProvider->id)
            ->where('model_type', ServiceProvider::class)
            ->get()
            ->map(function ($media) {
                return [
                    'file_path' => asset('storage/' . $media->file_path),
                    'file_name' => $media->file_name,
                    'file_type' => $media->file_type,
                ];
            });


        $projectMedia = [];
        foreach ($responseProjects as $project) {
            $media = Media::where('model_id', $project->id)
                ->where('model_type', Project::class)
                ->get()
                ->map(function ($m) {
                    return [
                        'file_path' => asset('storage/' . $m->file_path),
                        'file_name' => $m->file_name,
                        'file_type' => $m->file_type,
                    ];
                });

            $projectMedia[] = [
                'project_id' => $project->id,
                'media' => $media,
            ];
        }

        return response()->json([
            'message' => 'Profile, projects and services saved successfully.',
            'service_provider' => $serviceProvider,
            'projects' => $responseProjects,
            'services' => $responseServices,
            'business_images' => $businessImages,
            'project_media' => $projectMedia,
        ], 200);
    }

    private function saveMedia(Project $project, $path, $fileName, $fileType)
    {
        Media::create([
            'model_id' => $project->id,
            'model_type' => Project::class,
            'file_path' => $path,
            'file_name' => $fileName,
            'file_type' => $fileType,
        ]);
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

        return Media::create([
            'model_id' => $serviceProvider->id,
            'model_type' => ServiceProvider::class,
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
            'file_type' => 'image',
        ]);
    }

    private function generateSeoAlias($businessName, $userId)
    {
        // Пример: barber-shop-sofia-123
        $slug = Str::slug($businessName);
        return $slug . '-' . $userId;
    }


}