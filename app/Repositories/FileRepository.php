<?php

namespace App\Repositories;

use App\Models\File;

class FileRepository extends Repository
{
    public function __construct(protected File $model)
    {

    }

    public function create($data, $directory = ""): ?File
    {
        $file = $data['file'];

        $path = $file->store('public/files' . (empty($directory) ? '' : '/' . $directory));

        return parent::create([
            'filename' => $file->hashName(),
            'orig_filename' => $file->getClientOriginalName(),
            'path' => $path,
            'type' => $file->getClientMimeType(),
        ]);
    }
}