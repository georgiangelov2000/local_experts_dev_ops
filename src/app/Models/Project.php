<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\ServiceProvider;

class Project extends Model
{
    use HasFactory;

    protected $table = "user_projects";

    protected $fillable = [
        'service_provider_id',
        'project_name',
        'description',
        'status',
        'date_start',
        'date_end',
    ];

    /**
     * Релация с ServiceProvider
     */
    public function serviceProvider()
    {
        return $this->belongsTo(ServiceProvider::class);
    }
}
