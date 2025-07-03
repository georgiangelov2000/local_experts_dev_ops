<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // позволи заявките за автентикиран потребител
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'business_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'description' => 'nullable|string|max:500',
            'category_id' => 'nullable|integer|exists:categories,id',
            'service_category_id' => 'nullable|integer|exists:service_categories,id',
            'image' => 'nullable|image|max:2048',

            // 'projects' => 'array|max:3',
            // 'projects.*.id' => 'nullable|exists:projects,id',
            // 'projects.*.project_name' => 'required|string|max:255',
            // 'projects.*.description' => 'required|string',
            // 'projects.*.status' => 'required|integer|in:0,1',
            // 'projects.*.date_start' => 'required|date',
            // 'projects.*.date_end' => 'required|date|after_or_equal:projects.*.date_start',
            // 'projects.*.image' => 'nullable|image|max:2048',
            // 'projects.*.video' => 'nullable|mimetypes:video/mp4,video/avi,video/mov|max:10240',

            // 'services' => 'array',
            // 'services.*.price' => 'required|numeric|min:0',
            // 'services.*.description' => 'required|string|max:500',
        ];
    }
}
