<?php

namespace App\Http\Resources\Fee;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        if (isset($data['select_active'])) {
            $data['select_active'] = $data['select_active'] == '1' ? true : false;
        }

        if (isset($data['select_price'])) {
            $data['select_price'] = (float) $data['select_price'];
        }

        return $data;
    }
}
