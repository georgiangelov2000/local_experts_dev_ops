<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $type = $this->input('type');
        $base = [
            'email'    => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:6',
            'type'     => 'required|in:2,3',
        ];

        if ($type == 2) { // Service Provider
            return array_merge($base, [
                'business_name' => 'required|string|max:255',
                'service_category_id' => 'required|integer|exists:service_categories,id',
            ]);
        }
        return $base;
    }
}
