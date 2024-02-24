<?php

namespace App\Models\Generators;

use App\Enums\PaymentStatus;
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

    public function getStatusClasses(PaymentStatus $status)
    {
        return match (true) {
            PaymentStatus::CONFIRMED === $status => "success",
            PaymentStatus::REJECTED === $status => "danger",
            PaymentStatus::CANCELLED === $status => "warning",
            PaymentStatus::PARTIAL === $status => "info",
            PaymentStatus::SUBMITTED === $status => "bg-slate-400 text-white",
        };
    }
}