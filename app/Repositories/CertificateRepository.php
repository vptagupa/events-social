<?php

namespace App\Repositories;

use App\Models\Certificate;
use App\Models\Workshop;


class CertificateRepository extends Repository
{
    use Conditions\CertificateConditions;
    use Creators\File;

    public function __construct(protected Certificate $model)
    {
        $this->file = app()->make(FileRepository::class);
    }

    public function create(array $data): ?Certificate
    {
        return \DB::transaction(function () use ($data) {
            $file = $this->saveFile($data['file'], 'certificates');
            $data['file_id'] = $file->id;

            if (isset($data['workshop'])) {
                $workshop = Workshop::find($data['workshop']);
                if ($workshop) {
                    $data['workshop_id'] = $workshop->id;
                }
                unset($data['workshop']);
            }

            return parent::create($data);
        });
    }
}