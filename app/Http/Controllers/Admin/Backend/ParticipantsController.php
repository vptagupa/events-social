<?php

namespace App\Http\Controllers\Admin\Backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\Participant\ParticipantResource;
use Illuminate\Http\Request;
use App\Repositories\ParticipantRepository;

class ParticipantsController extends Controller
{
    public function __construct(private ParticipantRepository $repository)
    {

    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render('admin/backend/participants/index');
    }

    public function list(Request $request)
    {
        return ParticipantResource::collection(
            $this->repository->list(
                query: [
                    'query' => $request->get('query'),
                    'event' => true,
                    'eventOrganizer' => true,
                ],
                paginate: true,
                perPage: $request->get('per_page'),
            )
        );
    }
}
