<?php

namespace App\Exports;

use App\Repositories\EventRepository;
use App\Repositories\ParticipantRepository;
use App\Services\Griddable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\RegistersEventListeners;

use App\Services\RegistrationForm;

class ParticipantsExport implements WithMapping, FromQuery, WithHeadings, WithEvents
{
    use Exportable, RegistersEventListeners;
    protected $participants;
    protected $events;
    protected $data = [];
    protected $heading;

    public function __construct(protected $filter)
    {
        $this->participants = app()->make(ParticipantRepository::class);
        $this->events = app()->make(EventRepository::class);
    }

    public function query()
    {
        return $this->participants->list(
            query: $this->filter,
            orderBy: ['id', 'asc'],
        );
    }
    public function map($participant): array
    {
        $this->data = [];
        $workshop = $participant->workshops->first();
        $registrations = RegistrationForm::populate($participant->id, $workshop->event_id);

        $this->data[] = $workshop->code;

        foreach ($registrations as $flex) {
            Griddable::grids($flex['grids'], function ($grid, $column, $component) {
                if ($component['type'] == 'file') {
                    $this->data[] = $component['value']?->url ?? '';
                } else {
                    $this->data[] = $component['value'];
                }
            });
        }

        foreach ($workshop->attendance as $row) {
            $this->data[] = $row->created_at;
        }

        return $this->data;
    }

    public function headings(): array
    {
        $this->data = [];
        $event = $this->events->find($this->filter['event_id']);
        $registrations = $event?->registrationForm?->schema['flexis'] ?? [];

        $this->data[] = 'Code';
        foreach ($registrations as $flex) {
            Griddable::grids($flex['grids'], function ($grid, $column, $component) {
                $this->data[] = $component['config']['name'] ?? '';
            });
        }

        $this->data[] = 'Attendance';

        return $this->data;
    }

    public static function afterSheet(AfterSheet $event)
    {
        $event->sheet->getDelegate()->getPageSetup()->setOrientation(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::ORIENTATION_LANDSCAPE);
    }
}
