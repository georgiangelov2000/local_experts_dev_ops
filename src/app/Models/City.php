<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\ServiceProvider;
use App\Models\Workspace;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public $timestamps = false;

    /**
     * A city can have many workspaces.
     */
    public function workspaces(): HasMany
    {
        return $this->hasMany(Workspace::class);
    }

    public function serviceProviders()
    {
        return $this->hasManyThrough(
            ServiceProvider::class, // final model
            Workspace::class,       // intermediate table
            'city_id',              // foreign key on workspaces
            'id',                   // local key on service_providers
            'id',                   // local key on cities
            'service_provider_id'   // foreign key on workspaces
        );
    }
}
