<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppSettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'app_name' => $this->app_name,
            'app_logo_url' => $this->app_logo ? asset('storage/' . $this->app_logo) : null,
        ];
    }
}
