<?php

namespace App\Models\Generators;

use App\Models\Workshop;
use Carbon\Carbon;

trait WorkshopGenerator
{
    protected function generateCode()
    {
        $code = Carbon::now()->format('ymdhis');
        $code = substr(str_shuffle($code . $this->id), 0, 6);

        if (Workshop::whereCode($code)->exists()) {
            return $this->generateCode();
        }

        return $code;
    }
}