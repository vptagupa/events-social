<?php

namespace App\Http\Controllers\Organizer;

use App\Enums\CertificateStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Event\StoreCertificateRequest;
use App\Http\Resources\Event\CertificateResource;

use App\Models\Certificate;
use App\Models\Event;

use App\Repositories\CertificateRepository;

use Illuminate\Http\Request;

class CertificatesController extends Controller
{
    public function __construct(private CertificateRepository $repository)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Event $event)
    {
        return $this->render('organizer/events/manage/certificates/index', [
            'event' => $event,
            'certificate_statuses' => CertificateStatus::all(),
            'default_certificate_status' => CertificateStatus::NOT_PRINTED
        ]);
    }

    public function list(Request $request, Event $event)
    {
        return CertificateResource::collection(
            $this->repository->list(
                query: [
                    'name' => $request->get('query')['query'],
                    'certificate_status' => $request->get('query')['certificate_status'] ?? '',
                    'event' => true,
                    'event_id' => $event->id,
                    'workshop.participant' => true,
                    'file' => true
                ],
                paginate: true,
                perPage: $request->get('per_page')
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCertificateRequest $request, event $event)
    {
        return $this->repository->create($request->safe()->only([
            'event_id',
            'name',
            'file',
            'creator_type',
            'creator_id',
            'workshop',
        ]))->load(['file', 'workshop.participant']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateName(Request $request, Event $event, Certificate $certificate)
    {
        $request->validate([
            'name' => 'required|max:125'
        ]);
        $this->repository->update($request->only([
            'name',
        ]), $certificate->id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function printSelect(Request $request, Event $event)
    {
        return $this->repository->printable($event->id, json_decode($request->get('ids')));
    }

    /**
     * Generate the specified resource in storage.
     */
    public function printtable(Request $request, Event $event)
    {
        return \App\Services\Certificate::printtable(json_decode($request->get('ids')));
    }

    /**
     * Update the specified resource in storage.
     */
    public function downloadSelect(Request $request, Event $event)
    {
        return $this->repository->downloadable($event->id, json_decode($request->get('ids')));
    }

    /**
     * Download the specified resource in storage.
     */
    public function download(Request $request, Event $event)
    {
        return \Storage::download(\App\Services\Certificate::download(json_decode($request->get('ids'))));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event, Certificate $certificate)
    {
        $this->repository->delete($certificate->id);
    }
}
