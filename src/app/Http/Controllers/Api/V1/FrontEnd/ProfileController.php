<?php

namespace App\Http\Controllers\Api\V1\FrontEnd;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use App\Models\Media;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ProfileController extends Controller
{
    public function projects(Request $request) {
        $validated = $request->validate([
            'service_provider_id' => 'required|exists:service_providers,id',
            'projects' => 'required|array|max:3',
            'projects.*.id' => 'nullable|exists:projects,id',
            'projects.*.project_name' => 'required|string|max:255',
            'projects.*.description' => 'required|string',
            'projects.*.status' => 'required|integer|in:0,1',
            'projects.*.date_start' => 'required|date', 
            'projects.*.date_end' => 'required|date|after_or_equal:projects.*.date_start',
            'projects.*.image' => 'nullable|image|max:2048',
            'projects.*.video' => 'nullable|mimetypes:video/mp4,video/avi,video/mov|max:10240',
        ]);

        $user = $request->user();
        $responseProjects = [];

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

        return response()->json([
            'message' => 'Projects saved successfully.',
            'data' => $responseProjects
        ],200);
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
}