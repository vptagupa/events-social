<?php

namespace App\Models\Generators;

use App\Models\Transaction;
use Carbon\Carbon;

trait TransactionGenerator
{
    protected function generateCode()
    {
        $code = Carbon::now()->format('Ymdhis');
        $code = substr(str_shuffle($code . $this->id), 0, 15);

        if (Transaction::whereCode($code)->exists()) {
            return $this->generateCode();
        }

        return $code;
    }
}