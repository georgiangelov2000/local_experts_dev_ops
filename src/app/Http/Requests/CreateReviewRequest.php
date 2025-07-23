<?php

namespace App\Http\Requests\Api\V1\FrontEnd;

use Illuminate\Foundation\Http\FormRequest;

class CreateReviewRequest extends FormRequest
{
    public function authorize()
    {
        return true;  // Adjust if you want authorization logic here
    }

    public function rules()
    {
        return [
            'review_text' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'user_id' => 'nullable|integer|exists:users,id',
            'service_provider_id' => 'required|integer|exists:service_providers,id',
        ];
    }
}
