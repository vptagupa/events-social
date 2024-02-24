<?php

namespace App\Repositories\Concerns;

use App\Enums\PaymentStatus;
use Carbon\Carbon;

/**
 * Trait for participant payment transactions
 */
trait Transaction
{
    /**
     * Confirm transaction
     * @expected array $data{
     *  float amount
     *  string remarks as nullable
     * }
     * @sideEffect send confirm email notification
     * @return void
     */
    public function confirmed(array $data, int $transaction)
    {
        $model = $this->model()->find($transaction);

        if (!$model->has_submitted) {
            throw new \Exception("This payment has already been processed.");
        }

        \DB::transaction(function () use ($model, $data, $transaction) {
            $workshop = $model->workshop;
            $workshop->confirmed_at = Carbon::now();
            $workshop->notifyConfirmed();
            $workshop->payment_status = PaymentStatus::CONFIRMED->value;
            $workshop->save();

            parent::update([
                'actual_paid_amount' => $data['amount'],
                'remarks' => $data['remarks'] ?? '',
                'status' => $workshop->payment_status
            ], $transaction);
        });
    }

    /**
     * Reject transaction
     * @sideEffect send rejected email notification
     * @return void
     */
    public function rejected(string $remarks, int $transaction)
    {
        $model = $this->model()->find($transaction);

        if (!$model->has_submitted) {
            throw new \Exception("This payment has already been processed.");
        }

        \DB::transaction(function () use ($model, $transaction, $remarks) {
            $workshop = $model->workshop;
            // $workshop->notifyRejected($model);
            $workshop->payment_status = PaymentStatus::REJECTED->value;
            $workshop->save();

            parent::update([
                'remarks' => $remarks,
                'status' => $workshop->payment_status
            ], $transaction);
        });
    }

    /**
     * Cancelled transaction
     * @sideEffect send cancelled email notification
     * @return void
     */
    public function cancelled(string $remarks, int $transaction)
    {
        $model = $this->model()->find($transaction);

        if (!$model->has_submitted) {
            throw new \Exception("This payment has already been processed.");
        }

        \DB::transaction(function () use ($model, $remarks, $transaction) {
            $workshop = $model->workshop;
            // $workshop->notifyCancelled($model);
            $workshop->payment_status = PaymentStatus::CANCELLED->value;
            $workshop->save();

            parent::update([
                'remarks' => $remarks,
                'status' => $workshop->payment_status
            ], $transaction);
        });
    }

    /**
     * Partial transaction
     * @expected array $data{
     *  float amount
     *  string remarks as nullable
     * }
     * @sideEffect send partial email notification
     * @return void
     */
    public function partial(array $data, int $transaction)
    {
        $model = $this->model()->find($transaction);

        if (!$model->has_submitted) {
            throw new \Exception("This payment has already been processed.");
        }

        \DB::transaction(function () use ($model, $data, $transaction) {
            $workshop = $model->workshop;
            // $workshop->notifyBalance($model);
            $workshop->payment_status = PaymentStatus::PARTIAL->value;
            $workshop->payment_at = null;
            $workshop->save();

            parent::update([
                'actual_paid_amount' => $data['amount'],
                'remarks' => $data['remarks'] ?? '',
                'status' => $workshop->payment_status
            ], $transaction);
        });
    }
}