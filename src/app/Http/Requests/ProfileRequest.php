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
            'service_provider_id' => 'nullable|exists:service_providers,id',

            // Профилни полета
            'email' => 'nullable|email|max:255|unique:users,email,' . $this->user()->id,
            'city_id' => 'nullable|exists:cities,id',
            'category_id' => 'nullable|exists:categories,id',
            'subcategory_id' => 'nullable|exists:service_categories,id',
            'password' => 'nullable|string|min:6|confirmed',

            // Проекти
            'projects' => 'nullable|array|max:3',
            'projects.*.id' => 'nullable|exists:projects,id',
            'projects.*.project_name' => 'required_with:projects|string|max:255',
            'projects.*.description' => 'required_with:projects|string',
            'projects.*.status' => 'required_with:projects|integer|in:0,1',
            'projects.*.date_start' => 'required_with:projects|date',
            'projects.*.date_end' => 'required_with:projects|date|after_or_equal:projects.*.date_start',
            'projects.*.image' => 'nullable|image|max:2048',
            'projects.*.video' => 'nullable|mimetypes:video/mp4,video/avi,video/mov|max:10240',
        ];
    }
}
