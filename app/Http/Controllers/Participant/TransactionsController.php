<?php

namespace App\Http\Controllers\Participant;

use App\Enums\PaymentStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use App\Repositories\TransactionRepository;
use Illuminate\Http\Request;

class TransactionsController extends Controller
{
    public function __construct(private TransactionRepository $repository)
    {

    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render('participant/transactions/index', [
            'statuses' => PaymentStatus::all()
        ]);
    }

    public function list(Request $request)
    {
        return TransactionResource::collection(
            $this->repository->list(
                query: [
                    'query' => $request->get('query'),
                    'workshop_participant' => true,
                    'file' => true
                ],
                paginate: true,
                perPage: $request->get('per_page'),
                orderBy: ['id', 'desc']
            )
        );
    }

    public function next(Request $request, Transaction $transaction)
    {
        return TransactionResource::collection(
            $this->repository->list(
                query: [
                    'query' => $request->get('query'),
                    'workshop_participant' => true,
                    'file' => true,
                    'next' => true,
                    'current_id' => $transaction->id
                ],
                paginate: true,
                perPage: 1,
            )
        );
    }

    public function previous(Request $request, Transaction $transaction)
    {
        return TransactionResource::collection(
            $this->repository->list(
                query: [
                    'query' => $request->get('query'),
                    'workshop_participant' => true,
                    'file' => true,
                    'previous' => true,
                    'current_id' => $transaction->id
                ],
                paginate: true,
                perPage: 1,
            )
        );
    }

    /**
     * Get Transaction Info
     */
    public function info(Request $request, Transaction $transaction)
    {
        return (
            new TransactionResource(
                $transaction->load([
                    'workshop.participant',
                    'file'
                ]),

            )
        )->additional([
                    'meta' => [
                        'is_fully_paid' => $transaction->workshop->is_fully_paid,
                        'paid' => $transaction->workshop->paid,
                        'balance' => $transaction->workshop->balance,
                        'payment_status' => $transaction->workshop->payment_status,
                        'payment_status_classes' => $transaction->workshop->payment_status_classes
                    ]
                ]);
    }

    /**
     * Confirmed payment
     */
    public function confirmed(Request $request, Transaction $transaction)
    {
        $request->validate([
            'amount' => [
                'required',
                'numeric',
                'gte:' . $transaction->workshop->balance
            ]
        ]);

        $this->repository->confirmed($request->only(['amount', 'remarks']), $transaction->id);
    }

    /**
     * Rejected payment
     */
    public function rejected(Request $request, Transaction $transaction)
    {
        $request->validate([
            'remarks' => 'required'
        ]);

        $this->repository->rejected($request->get('remarks'), $transaction->id);
    }

    /**
     * Rejected payment
     */
    public function cancelled(Request $request, Transaction $transaction)
    {
        $request->validate([
            'remarks' => 'required'
        ]);

        $this->repository->cancelled($request->get('remarks'), $transaction->id);
    }

    /**
     * Partial payment
     */
    public function partial(Request $request, Transaction $transaction)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1'
        ]);

        $this->repository->partial($request->only(['amount', 'remarks']), $transaction->id);
    }
}
