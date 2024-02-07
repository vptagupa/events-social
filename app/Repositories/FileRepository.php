<?php

namespace App\Repositories;

use App\Models\File;

class FileRepository extends Repository
{
    public function __construct(protected File $model)
    {

    }

    public function create($data): ?File
    {
        $file = $data['file'];

        $path = $file->store('public/files/payments');

        return parent::create([
            'filename' => $file->hashName(),
            'orig_filename' => $file->getClientOriginalName(),
            'path' => $path,
            'type' => $file->getClientMimeType(),
        ]);
    }
}