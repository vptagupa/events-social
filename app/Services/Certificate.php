<?php

namespace App\Services;

use Intervention\Image\Interfaces\EncodedImageInterface;
use Storage;
use Carbon\Carbon;
use Dompdf\Dompdf;
use Dompdf\Options;
use Jurosh\PDFMerge\PDFMerger;
use App\Repositories\CertificateRepository;
use PhpZip\ZipFile;

use Intervention\Image\ImageManager;
use Intervention\Image\Typography\FontFactory;

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

            $url = '';
            $path = "";

            if ($model->file && $model->file->is_image) {
                $url = $model->file->url;
            } elseif (!$model->file) {
                $url = route('certificate', $model->workshop->uuid);
            }

            if ($url) {
                $options = new Options();
                $options->set('isRemoteEnabled', true);
                $dompdf = new Dompdf($options);

                $dompdf->loadHtml(trim(preg_replace('/>\s+</', "><", view("components.pdf", ['src' => $url])->render())));
                $path = '/public/files/converted/' . $model->name ?: $model->workshop->name . '.pdf';
                $dompdf->setPaper('A4', 'landscape');
                $dompdf->render();

                Storage::put($path, $dompdf->output());
            }

            if ($path) {
                $merger->addPDF(storage_path('app' . $path), 'all', "horizontal");
            }
        }

        return $merger->merge('browser');
    }

    /**
     * Return downloadable file in zip or single file
     */
    public static function download(array|int $ids)
    {
        $ids = is_array($ids) ? $ids : [$ids];
        $service = self::construct();
        if (count($ids) > 1) {
            return $service->zipped($ids);
        }

        return $service->file($ids[0]);
    }

    /**
     *  Return a single file path or Encoded blob data
     * @return null|string|\Intervention\Image\Interfaces\EncodedImageInterface
     */
    public function file(int $id): null|string|EncodedImageInterface
    {
        $model = $this->repository->model()->where('id', $id)->first();

        if ($model->file) {
            return $model->file->path;
        } elseif (!$model->file) {
            return Certificate::produce(str($model->name)->title());
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

        foreach ($models->filter(fn($model) => $model->file ? true : false)->all() as $model) {
            $zip->addFile(new \SplFileInfo(storage_path("app/" . $model->file->path)), $model->workshop->name . '-' . $model->id . '.' . $model->file->ext);
        }

        foreach ($models->filter(fn($model) => !$model?->file)->all() as $model) {
            $zip->addFromString($model->name . '-' . $model->id . '.jpeg', file_get_contents(route('certificate', $model->workshop->uuid)));
        }

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
                    $certificate->sents += 1;
                    $certificate->save();

                    $certificate->workshop->sendCertificate($certificate);
                }
            }
        }, $ids, 'id', 10);
    }

    /**
     * Produce certificate
     * 
     * @return \Intervention\Image\Interfaces\EncodedImageInterface in jpeg
     */
    public static function produce(
        $name,
        $certificatePath = "app/images/certificate.jpg",
        $fontPath = "app/fonts/edwardian-script-itc-bold.ttf",
        $fontSize = 90
    ): EncodedImageInterface {
        $certificatePath = storage_path($certificatePath);
        $fontPath = storage_path($fontPath);

        $image = ImageManager::gd()->read($certificatePath);

        $image->text($name, 850, 350, function (FontFactory $font) use ($fontPath, $fontSize) {
            $font->filename($fontPath);
            $font->color('#4f6069');
            $font->size($fontSize);
            $font->align('center');
            $font->valign('middle');
            $font->lineHeight(1);
        });

        return $image->toJpeg();
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