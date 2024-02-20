<?php

namespace App\Repositories;

use App\Models\Transaction;

class TransactionRepository extends Repository
{
    use Conditions\TransactionConditions;

    public function __construct(protected Transaction $model)
    {

    }
}