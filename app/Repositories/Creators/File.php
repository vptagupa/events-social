<?php

namespace App\Repositories\Creators;

trait File
{
    protected function saveFile($file)
    {
        if (!$file) {
            return null;
        }

        return $this->file->create([
            'file' => $file
        ]);
    }
}