<?php

namespace App\Http\Controllers\Admin\Backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\AuditResource;
use App\Repositories\AuditRepository;
use Illuminate\Http\Request;

class AuditController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(private AuditRepository $repository)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render('admin/backend/audit/index');
    }

    public function list(Request $request)
    {
        return AuditResource::collection(
            $this->repository->list(
                query: ['auditable_type' => $request->get('query'), 'user' => true],
                perPage: $request->get('per_page'),
                orderBy: ['created_at', 'desc'],
                paginate: true
            )
        );
    }
}
