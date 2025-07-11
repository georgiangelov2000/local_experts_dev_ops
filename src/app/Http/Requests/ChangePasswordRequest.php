<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'currentPassword' => 'required|string',
            'newPassword' => 'required|string|min:8|confirmed',
        ];
    }

    public function messages()
    {
        return [
            'currentPassword.required' => 'Current password is required.',
            'newPassword.required' => 'New password is required.',
            'newPassword.min' => 'New password must be at least 8 characters.',
            'newPassword.confirmed' => 'Passwords do not match.',
        ];
    }
} 