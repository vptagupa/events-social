<?php

namespace App\Repositories\Creators;

trait File
{
    protected function saveFile($file, $directory = "")
    {
        if (!$file) {
            return null;
        }

        return $this->file->create([
            'file' => $file
        ], $directory);
    }
}