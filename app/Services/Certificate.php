<?php

namespace App\Services;

use Storage;
use Carbon\Carbon;
use Dompdf\Dompdf;
use Dompdf\Options;
use Jurosh\PDFMerge\PDFMerger;
use App\Repositories\CertificateRepository;
use PhpZip\ZipFile;

class Certificate
{
    public function __construct(protected CertificateRepository $repository)
    {

    }

    public static function printtable(array|int $ids)
    {
        return self::construct()->generate($ids);
    }

    /**
     * Generate a single PDF file from a multiple files
     * @return Jurosh\PDFMerge\PDF stream output
     */
    public function generate(array|int $ids)
    {
        $ids = is_array($ids) ? $ids : [$ids];

        $models = $this->repository->model()->whereIn('id', $ids)->get();

        $merger = new PDFMerger;

        foreach ($models as $model) {
            $path = '/' . $model->file->path;
            if ($model->file->is_image) {
                $options = new Options();
                $options->set('isRemoteEnabled', true);
                $dompdf = new Dompdf($options);

                $dompdf->loadHtml(view("components.pdf", ['src' => $model->file->url])->render());
                $path = '/public/files/converted/' . $model->file->no_ext_filename . '.pdf';
                $dompdf->setPaper('A4', 'landscape');
                $dompdf->render();

                Storage::put($path, $dompdf->output());
            }

            $merger->addPDF(storage_path('app' . $path), "all", "horizontal");
        }

        return $merger->merge('browser');
    }

    /**
     * Return downloadable file in zip or single file
     */
    public static function download(array|int $ids)
    {
        $ids = is_array($ids) ? $ids : [$ids];

        if (count($ids) > 1) {
            return self::construct()->zipped($ids);
        }

        return $service->file($ids[0]);
    }

    /**
     * Return a single file path
     */
    public function file(int $id)
    {
        $model = $this->repository->model()->where('id', $id)->first();

        if ($model->file) {
            return $model->file->path;
        }

        return null;
    }

    /**
     * Generate files in zip file
     * @return zip path
     */
    public function zipped(array $ids): string
    {
        $models = $this->repository->model()->whereIn('id', $ids)->get();

        $zip = new ZipFile;

        $zip->addAll(
            $models->filter(fn($model) => $model->file ? true : false)
                ->reduce(function ($files, $model) {
                    if ($model->file) {
                        $files[$model->file->id . '-' . $model->file->orig_filename] = new \SplFileInfo(storage_path("app/" . $model->file->path));
                    }
                    return $files;
                })
        );

        $dir = "public/zipped";
        if (!Storage::exists($dir)) {
            Storage::makeDirectory($dir);
        }

        $filename = str_shuffle(Carbon::now()->format('ymdhis'));
        $path = "public/zipped/" . $filename . ".zip";

        $zip->saveAsFile(storage_path("app/" . $path))
            ->close();

        return $path;
    }

    /**
     * Send certificates
     */
    public static function send(array|int $ids): void
    {
        $ids = is_array($ids) ? $ids : [$ids];

        self::construct()->mail($ids);
    }

    /**
     *Send certificates via email notification
     */
    public function mail(array $ids): void
    {
        $this->repository->callableUpdate(function ($certificates) {
            foreach ($certificates as $certificate) {
                if ($certificate->workshop) {
                    $certificate->sends += 1;
                    $certificate->save();

                    $certificate->workshop->sendCertificate($certificate);
                }
            }
        }, $ids, 'id', 10);
    }

    public static function construct()
    {
        return(
            new self(
                app()->make(CertificateRepository::class)
            )
        );
    }
}