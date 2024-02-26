<?php

namespace App\Repositories\Conditions;

use App\Enums\RegistrationStatus;

trait ParticipantCondition
{

    public function eventIdCondition(&$builder, $query)
    {
        return $builder->when(isset($query['event_id']) && $query['event_id'], function ($builder) use ($query) {
            $builder->with([
                'workshops' => function ($builder) use ($query) {
                    $builder->where('event_id', $query['event_id']);
                }
            ])
                ->whereHas('workshops', function ($builder) use ($query) {
                    $builder->where('event_id', $query['event_id']);
                });
        });
    }

    public function eventCondition(&$builder, $query)
    {
        return $builder->when(isset($query['event']) && $query['event'], function ($builder) use ($query) {
            $builder->with([
                'workshops.event'
            ]);
        });
    }

    public function workshopsWithParticipantCondition(&$builder, $query)
    {
        return $builder->when(isset($query['workshops.participant']) && $query['workshops.participant'], function ($builder) use ($query) {
            $builder->with([
                'workshops.participant'
            ]);
        });
    }

    public function eventOrganizerCondition(&$builder, $query)
    {
        return $builder->when(isset($query['eventOrganizer']) && $query['eventOrganizer'], function ($builder) use ($query) {
            $builder->with([
                'workshops.event.organizer'
            ]);
        });
    }

    public function queryCondition(&$builder, $query)
    {
        return $builder->when(isset($query['query']) && $query['query'], function ($builder) use ($query) {
            $builder->where('name', 'like', '%' . $query['query'] . '%')
                ->orWhere('email', 'like', '%' . $query['query'] . '%')
                ->orWhereHas('workshops', function ($builder) use ($query) {
                    $builder->where('code', 'like', '%' . $query['query'] . '%');
                });
        });
    }

    public function filterCondition(&$builder, $query)
    {
        return $builder->when(isset($query['filter']) && $query['filter'], function ($builder) use ($query) {
            $builder->whereHas('workshops', function ($builder) use ($query) {
                $builder->whereEventId($query['event_id']);
                foreach ($query['filter'] as $filter) {
                    if (strtolower($filter['name']) == 'status' && $filter['value'] != '') {
                        if (RegistrationStatus::INVITED === RegistrationStatus::from($filter['value'])) {
                            $builder->whereNotNull('invited_at');
                        } elseif (RegistrationStatus::INVITED_ACCEPTED === RegistrationStatus::from($filter['value'])) {
                            $builder->whereNotNull('invited_at');
                            $builder->whereNotNull('accepted_at');
                        } elseif (RegistrationStatus::INVITED_NOTACCEPTED === RegistrationStatus::from($filter['value'])) {
                            $builder->whereNotNull('invited_at');
                            $builder->whereNull('accepted_at');
                        } elseif (RegistrationStatus::NOT_INVITED === RegistrationStatus::from($filter['value'])) {
                            $builder->whereNull('invited_at');
                        } elseif (RegistrationStatus::INPROGRESS === RegistrationStatus::from($filter['value'])) {
                            $builder->whereNull('submitted_at');
                            $builder->whereNull('confirmed_at');
                        } elseif (RegistrationStatus::FORM_SUBMITTED === RegistrationStatus::from($filter['value'])) {
                            $builder->whereNotNull('submitted_at');
                        } elseif (RegistrationStatus::FORM_NOTSUBMITTED === RegistrationStatus::from($filter['value'])) {
                            $builder->whereNull('submitted_at');
                        } elseif (RegistrationStatus::PAYMENT_SUBMITTED === RegistrationStatus::from($filter['value'])) {
                            $builder->whereNotNull('payment_at');
                        } elseif (RegistrationStatus::PAYMENT_NOTSUBMITTED === RegistrationStatus::from($filter['value'])) {
                            $builder->whereNull('payment_at');
                            $builder->whereNotNull('submitted_at');
                        } elseif (RegistrationStatus::PENDING_REVIEW === RegistrationStatus::from($filter['value'])) {
                            $builder->whereNotNull('payment_at');
                            $builder->whereNull('confirmed_at');
                        } elseif (RegistrationStatus::CONFIRMED === RegistrationStatus::from($filter['value'])) {
                            $builder->whereNotNull('confirmed_at');
                        } elseif (RegistrationStatus::CANCELLED === RegistrationStatus::from($filter['value'])) {
                            $builder->whereNotNull('cancelled_at');
                        }

                    } else {
                        $builder->whereRelation('registrations', 'name', $filter['name']);
                        $builder->whereRelation('registrations', 'value', 'like', '%' . $filter['value'] . '%');
                    }
                }
            });
        });
    }
}