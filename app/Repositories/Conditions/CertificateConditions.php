<?php

namespace App\Repositories\Conditions;

use App\Enums\CertificateStatus;

trait CertificateConditions
{
    public function eventCondition(&$builder, $query)
    {
        return $builder->when(isset($query['event']) && $query['event'], function ($builder) use ($query) {
            $builder->with('event');
        });
    }

    public function eventIdCondition(&$builder, $query)
    {
        return $builder->when(isset($query['event_id']) && $query['event_id'], function ($builder) use ($query) {
            $builder->where('event_id', $query['event_id']);
        });
    }

    public function workshopCondition(&$builder, $query)
    {
        return $builder->when(isset($query['workshop']) && $query['workshop'], function ($builder) use ($query) {
            $builder->with('workshop');
        });
    }

    public function workshopWithParticipantCondition(&$builder, $query)
    {
        return $builder->when(isset($query['workshop.participant']) && $query['workshop.participant'], function ($builder) use ($query) {
            $builder->with('workshop.participant');
        });
    }

    public function fileCondition(&$builder, $query)
    {
        return $builder->when(isset($query['file']) && $query['file'], function ($builder) use ($query) {
            $builder->with('file');
        });
    }

    public function certificateStatusCondition(&$builder, $query)
    {
        return $builder->when(isset($query['certificate_status']) && $query['certificate_status'], function ($builder) use ($query) {
            $status = CertificateStatus::from($query['certificate_status']);
            if ($status === CertificateStatus::PRINTED) {
                $builder->where('prints', '>', 0);
            } elseif ($status === CertificateStatus::DOWNLOADDED) {
                $builder->where('downloads', '>', 0);
            } elseif ($status === CertificateStatus::NOT_PRINTED) {
                $builder->where('prints', '<=', 0);
            } elseif ($status === CertificateStatus::NOT_DOWNLOADDED) {
                $builder->where('downloads', '<=', 0);
            }
        });
    }

    public function participantNameCondition(&$builder, $query)
    {
        return $builder->when(isset($query['participant_name']) && $query['participant_name'], function ($builder) use ($query) {
            $builder->whereHas('workshops', function ($builder) use ($query) {
                $builder->whereHas('participant', function ($builder) use ($query) {
                    $builder->where('name', 'like', '%' . $query['participant_name'] . '%');
                });
            });
        });
    }
}