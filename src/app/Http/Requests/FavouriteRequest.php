<?php

namespace App\Http\Requests\Api\V1\FrontEnd;

use Illuminate\Foundation\Http\FormRequest;

class FavouriteRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'service_provider_id' => 'required|exists:service_providers,id',
        ];
    }
}
