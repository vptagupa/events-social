<?php

namespace App\Enums;

enum RegistrationStatus: string
{
    case INVITED = "Invited";
    case INVITED_ACCEPTED = "Invited & Accepted";
    case INVITED_NOTACCEPTED = "Invited & Not Accepted";
    case NOT_INVITED = "Not Invited";
    case INPROGRESS = "In-Progress";
    case FORM_SUBMITTED = "Form Submitted";
    case FORM_NOTSUBMITTED = "Form Not Submitted";
    case PAYMENT_SUBMITTED = "Payment Submitted";
    case PAYMENT_NOTSUBMITTED = "Payment Not Submitted";
    case PENDING_REVIEW = "Pending Review";
    case CONFIRMED = "Confirmed";
    case CANCELLED = "Cancelled";
    case ATTENDANCE = "Attendance";
    case NO_ATTENDANCE = "No Attendance";


    public static function all(): array
    {
        return array_map(function ($case) {
            return $case->toArray();
        }, RegistrationStatus::cases());
    }

    public function toArray(): array
    {
        return [
            'id' => $this->value,
            'name' => str($this->value)->ucfirst()
        ];
    }

}