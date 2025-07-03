<?php

namespace App\Http\Controllers\Api\V1\FrontEnd;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use App\Models\Certification;
use App\Models\ServiceProvider;
use App\Models\Media;
use App\Models\Project;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

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
        $serviceProvider = $user->serviceProvider()->first() ?? new ServiceProvider(['user_id' => $user->id]);

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

        return response()->json([
            'message' => 'Profile, projects, services and certifications saved successfully.'
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
