<?php

namespace App\Repositories;

use App\Models\Transaction;

class TransactionRepository extends Repository
{
    use Conditions\TransactionConditions;
    use Concerns\Transaction;

    public function __construct(protected Transaction $model)
    {
        // 
    }
}