<?php

namespace App\Repositories\Concerns;

use App\Enums\PaymentStatus;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;

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
            $workshop->payment_status = PaymentStatus::CONFIRMED->value;
            $workshop->save();

            $officialReceipt = null;
            if ($data['file'] instanceof UploadedFile) {
                $officialReceipt = $this->saveFile($data['file'], 'official-receipts');
                unset ($data['file']);
            }

            parent::update([
                'actual_paid_amount' => $data['amount'],
                'remarks' => $data['remarks'] ?? '',
                'status' => $workshop->payment_status,
                'official_receipt_id' => $officialReceipt?->id
            ], $transaction);

            $model->refresh();

            $workshop->notifyConfirmed($model);
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

            $workshop->payment_status = PaymentStatus::CANCELLED->value;
            $workshop->save();

            parent::update([
                'remarks' => $remarks,
                'status' => $workshop->payment_status
            ], $transaction);

            $workshop->notifyCancelled();
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
            $workshop->payment_status = PaymentStatus::PARTIAL->value;
            $workshop->payment_at = null;
            $workshop->save();

            parent::update([
                'actual_paid_amount' => $data['amount'],
                'remarks' => $data['remarks'] ?? '',
                'status' => $workshop->payment_status
            ], $transaction);

            $model->refresh();

            $workshop->notifyPartial($model);
        });
    }
}