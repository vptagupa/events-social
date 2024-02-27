<?php

namespace App\Repositories;

use App\Models\Certificate;
use App\Models\Workshop;
use Illuminate\Database\Eloquent\Collection;

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

    public function printable(int $event, array $certificates)
    {
        $collected = [];
        $this->callableUpdate(function (Collection $certificates) use (&$collected, $event) {
            foreach ($certificates->reject(fn($cert) => $cert->event_id != $event) as $certificate) {
                $certificate->prints += 1;
                $certificate->save();
                $collected[] = $certificate->id;
            }
        }, $certificates);

        return $collected;
    }

    public function downloadable(int $event, array $certificates)
    {
        $collected = [];
        $this->callableUpdate(function (Collection $certificates) use (&$collected, $event) {
            foreach ($certificates->reject(fn($cert) => $cert->event_id != $event) as $certificate) {
                $certificate->downloads += 1;
                $certificate->save();
                $collected[] = $certificate->id;
            }
        }, $certificates);

        return $collected;
    }
}