<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    use Generators\TransactionGenerator;

    protected $fillable = [
        'code',
        'workshop_id',
        'expected_price',
        'actual_paid_amount',
        'charges',
        'price',
        'tax_amount',
        'tax',
        'paid_at',
        'is_gateway',
        'failed_at',
        'failed_reason',
        'file_id',
        'confirmed_at',
        'confirmed_admin_id'
    ];

    protected $casts = [
        'expected_price' => 'decimal:2',
        'actual_paid_amount' => 'decimal:2',
        'charges' => 'decimal:2',
        'price' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'paid_at' => 'datetime:Y-m-d H:i:s',
        'is_gateway' => 'boolean',
        'failed_at' => 'datetime:Y-m-d H:i:s',
        'confirmed_at' => 'datetime:Y-m-d H:i:s',
    ];

    public static function booted()
    {
        static::created(function (Transaction $model) {
            $model->code = (new self())->generateCode();
            $model->save();
        });
    }

    protected function workshop()
    {
        return $this->belongsTo(Workshop::class);
    }

    protected function file()
    {
        return $this->belongsTo(File::class);
    }
}
