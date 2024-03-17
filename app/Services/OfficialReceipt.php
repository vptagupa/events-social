<?php

namespace App\Services;

use App\Models\Event;
use App\Models\Participant;
use App\Repositories\EventRepository;
use App\Repositories\ParticipantRepository;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Collection;
use NumberToWords\NumberToWords;

class OfficialReceipt
{
    public function __construct(protected ParticipantRepository $participant, protected EventRepository $event)
    {

    }

    public static function make(int|array $participant, int $event)
    {
        $base = (
            new self(
                app()->make(ParticipantRepository::class),
                app()->make(EventRepository::class)
            )
        );

        return $base->generate(is_array($participant) ? $participant : [$participant], $event);
    }

    public function generate(array $participants, int $event)
    {
        return $this->render(
            $this->participant->model()->whereIn('id', $participants)->get(),
            $this->event->find($event)
        );
    }

    public function render(Collection $participants, Event $event)
    {
        $participants = $participants->map(function ($participant) use ($event) {
            return $participant->load([
                'workshops' => function ($builder) use ($event) {
                    $builder->where('event_id', $event->id);
                }
            ]);
        });

        return PDF::setPaper([0, 0, 612, 306])->loadView(
            "components.receipt",
            [
                'participants' => $participants,
                'fnAmountToWordsTranslation' => fn($amount) => NumberToWords::transformNumber('en', $amount)
            ]
        );
    }
}