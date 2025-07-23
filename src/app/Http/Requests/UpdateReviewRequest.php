<?php

namespace App\Http\Requests\Api\V1\FrontEnd;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReviewRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'review_text' => 'sometimes|required|string',
            'rating' => 'sometimes|required|integer|min:1|max:5',
        ];
    }
}
