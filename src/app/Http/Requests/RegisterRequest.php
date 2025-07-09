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
        return [
            'email'                => 'required|string|email|max:255|unique:users,email',
            'password'             => 'required|string|min:6|confirmed',
            'type'                 => 'required|in:2,3' // Assuming 2 is SERVICE_PROVIDER and 3 is USER
        ];
    }
}
