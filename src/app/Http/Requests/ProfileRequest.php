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
        $tab = $this->input('tab');

        return match ($tab) {
            'basic' => [
                'business_name' => 'required|string|max:500',
                'email' => 'required|email|max:255',
                'description' => 'nullable|string',
                'category_id' => 'required|integer|exists:categories,id',
                'service_category_id' => 'required|integer|exists:service_categories,id',
                'image' => 'nullable|image|max:2048',
            ],
            'projects' => [
                'projects' => 'required|array',
                'projects.*.id' => 'nullable|exists:projects,id',
                'projects.*.project_name' => 'required|string|max:255',
                'projects.*.description' => 'required|string|max:500',
                'projects.*.status' => 'required|integer|in:0,1',
                'projects.*.date_start' => 'required|date',
                'projects.*.date_end' => 'required|date|after_or_equal:projects.*.date_start',
                'projects.*.image' => 'nullable|image|max:2048',
                'projects.*.video' => 'nullable|mimetypes:video/mp4,video/avi,video/mov|max:10240',
            ],
            'services' => [
                'services' => 'required|array',
                'services.*.id' => 'nullable|exists:services,id',
                'services.*.price' => 'required|numeric|min:0',
                'services.*.description' => 'required|string|max:1000',
            ],
            'certifications' => [
                'certifications' => 'required|array',
                'certifications.*.id' => 'nullable|exists:certifications,id',
                'certifications.*.name' => 'required|string|max:255',
                'certifications.*.description' => 'nullable|string|max:500',
                'certifications.*.image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            ],
            'contacts' => [
                'phone' => 'nullable|string|max:32',
                'email' => 'nullable|email|max:255',
                'facebook' => 'nullable|string|max:255',
                'instagram' => 'nullable|string|max:255',
                'website' => 'nullable|url|max:255',
                'address' => 'nullable|string|max:255',
            ],
            default => [],
        };
    }
}
