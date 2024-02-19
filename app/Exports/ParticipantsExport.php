<?php

namespace App\Exports;

use App\Repositories\EventRepository;
use App\Repositories\ParticipantRepository;
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
        $registrations = RegistrationForm::populate($participant->id, $participant->workshops->first()->event_id);

        foreach ($registrations as $flex) {
            $this->griddable($flex['grids'], $this->data);
        }

        return $this->data;
    }

    public function headings(): array
    {
        $this->data = [];
        $registrations = $this->events->find($this->filter['event_id'])?->registrationForm?->schema['flexis'] ?? [];

        foreach ($registrations as $flex) {
            $this->griddable($flex['grids'], $this->data, true);
        }

        return $this->data;
    }

    private function griddable($grids, &$data, $heading = false)
    {
        foreach ($grids as $grids) {
            foreach ($grids['columns'] as $columns) {
                foreach ($columns['components'] as $component) {
                    if ($component['type'] == 'grid') {
                        $this->griddable($component['grids'], $data, $heading);
                    } else {
                        if ($component['type'] == 'file' && !$heading) {
                            $data[] = $component['value']?->url ?? '';
                        } else {
                            $data[] = !$heading ? $component['value'] : $component['config']['name'] ?? '';
                        }

                    }
                }
            }
        }
    }

    public static function afterSheet(AfterSheet $event)
    {
        $event->sheet->getDelegate()->getPageSetup()->setOrientation(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::ORIENTATION_LANDSCAPE);
    }
}
