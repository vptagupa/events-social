<?php

namespace App\Http\Controllers\Admin\Backend;

use App\Http\Controllers\Controller;
use App\Imports\ParticipantImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ImportController extends Controller
{
    public function import(Request $request)
    {
        Excel::import(
            new ParticipantImport($request->get('event')),
            storage_path('app/public/imports/Registration Form - 37th AACCUP Annual National Conference (Responses) - Form Responses 1.csv')
        );
    }
}
