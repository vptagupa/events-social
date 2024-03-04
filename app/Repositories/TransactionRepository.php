<?php

namespace App\Repositories;

use App\Models\Transaction;

class TransactionRepository extends Repository
{
    use Conditions\TransactionConditions;
    use Concerns\Transaction;
    use Creators\File;

    public function __construct(protected Transaction $model)
    {
        $this->file = app()->make(FileRepository::class);
    }
}