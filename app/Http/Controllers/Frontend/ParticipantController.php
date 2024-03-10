<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Participant\PayRequest;
use App\Http\Requests\Participant\RegisterRequest;
use App\Models\Offer;
use App\Models\Workshop;
use App\Repositories\ParticipantRepository;
use App\Rules\Form;
use App\Services\Payment;
use App\Services\RegistrationForm;
use Carbon\Carbon;
use chillerlan\QRCode\Data\QRMatrix;
use chillerlan\QRCode\Output\QRGdImageWEBP;
use chillerlan\QRCode\Output\QRImagick;
use chillerlan\QRCode\QROptions;
use Illuminate\Http\Request;
use chillerlan\QRCode\QRCode;

class ParticipantController extends Controller
{
    public function __construct(private ParticipantRepository $repository)
    {

    }

    public function index(Workshop $workshop)
    {
        if ($workshop->is_confirmed) {
            return $this->status($workshop);
        }

        if ($workshop->is_invited && !$workshop->has_accepted) {
            return $this->accept($workshop);
        } elseif (!$workshop->has_submitted) {
            return $this->registration($workshop);
        } elseif (!$workshop->has_payment && !$workshop->event->is_free) {
            if ($workshop->event->is_offer_package) {
                return $this->offer($workshop);
            }
            return $this->pay($workshop);
        } elseif ($workshop->has_payment && !$workshop->is_confirmed) {
            return $this->completed($workshop);
        }

        return $this->status($workshop);
    }

    /**
     * Show resource for offer
     */
    public function offer(Workshop $workshop)
    {
        if ($redirect = $this->restrictIfNotFormSubmitted($workshop)) {
            return $redirect;
        }
        if ($redirect = $this->restrictIfPaid($workshop)) {
            return $redirect;
        }

        return $this->render('frontend/registration/offer/index', [
            'workshop' => $workshop->load([
                'event.offers' => function ($builder) {
                    $builder->active();
                }
            ])
        ]);
    }

    /**
     * Store offer selected
     */
    public function offerSelect(Workshop $workshop, Offer $offer)
    {
        if ($redirect = $this->restrictIfNotFormSubmitted($workshop)) {
            return $redirect;
        }
        if ($redirect = $this->restrictIfPaid($workshop)) {
            return $redirect;
        }

        $workshop->offer()->associate($offer);
        $workshop->save();

        return redirect(route('registration.pay', $workshop));
    }


    /**
     * Show resource for payment
     */
    public function pay(Workshop $workshop)
    {
        if ($redirect = $this->restrictIfNotFormSubmitted($workshop)) {
            return $redirect;
        }
        if ($redirect = $this->restrictIfPaid($workshop)) {
            return $redirect;
        }


        return $this->render('frontend/registration/payment/index', [
            'workshop' => $workshop->append('price'),
        ]);
    }

    /**
     * Store payment
     */
    public function payCreate(PayRequest $request, Workshop $workshop)
    {
        if ($redirect = $this->restrictIfPaid($workshop)) {
            return $redirect;
        }

        $request->merge([
            'event_id' => $workshop->event_id
        ]);

        $this->repository->pay($request->only(
            'method',
            'file',
            'event_id',
            'reference'
        ), $workshop->participant->id);

        return redirect(route("registration.completed", $workshop));
    }

    /**
     * Show resource for price breakdown
     */
    public function priceBreakdown(Workshop $workshop)
    {
        return Payment::calculate(
            $workshop->event->id,
            $workshop->event->is_offer_package ? $workshop->offer->price : $workshop->event->price,
            config('system.include_tax') ? config('system.tax') : 0
        );
    }

    /**
     * Show resource for confirmed
     */
    public function completed(Workshop $workshop)
    {
        if ($redirect = $this->restrictIfNotFormSubmitted($workshop)) {
            return $redirect;
        }
        if ($redirect = $this->restrictIfConfirmed($workshop)) {
            return $redirect;
        }

        return $this->render('frontend/registration/completed/index', [
            'workshop' => $workshop
        ]);
    }

    /**
     * Show resource for status
     */
    public function status(Workshop $workshop)
    {
        return $this->render('frontend/registration/status/index', [
            'workshop' => $workshop
        ]);
    }

    /**
     * Show resource for acceptance
     */
    public function accept(Workshop $workshop)
    {
        return $this->render('frontend/registration/accept/index', [
            'workshop' => $workshop
        ]);
    }

    /**
     * Accept the invitation
     */
    public function accepted(Workshop $workshop)
    {
        $workshop->accepted_at = Carbon::now();
        $workshop->save();

        return redirect(route('registration.index', $workshop));
    }

    /**
     * Show resource for registration
     */
    public function registration(Workshop $workshop)
    {
        if (!$workshop->event->is_published) {
            return $this->render('frontend/registration/register/error', [
                'message' => 'The registration has not yet been activated. Please ask your organizer to assist you.'
            ]);
        }

        return $this->render('frontend/registration/register/index', [
            'workshop' => $workshop,
            'registrationForm' => RegistrationForm::populate(
                $workshop->participant->id,
                $workshop->event->id,
            )
        ]);
    }

    /**
     * Store registration
     */
    public function register(RegisterRequest $request, Workshop $workshop)
    {
        $this->repository->register($request->only('flexis', 'event_id'), $workshop->participant->id);

        return redirect(route('registration.index', $workshop));
    }

    /**
     * Store registration for each form
     */
    public function form(Request $request, Workshop $workshop)
    {
        $request->validate([
            'flex' => new Form,
            'flex.grids' => 'required',
            'flex.grids.*.columns' => 'required',
            'flex.grids.*.columns.*.components' => 'required',
        ]);
        $request->merge([
            'event_id' => $workshop->event_id
        ]);

        $this->repository->storeForm($request->only(['flex', 'event_id']), $workshop->participant->id);
    }

    /**
     * Load Qr Code
     */
    public function qrCode(Workshop $workshop)
    {
        $options = new QROptions;
        $options->version = 7;
        $options->outputInterface = QRImagick::class;
        $options->imagickFormat = 'webp';
        $options->quality = 90;
        $options->scale = 20;
        $options->outputBase64 = false;
        $options->bgColor = '#ccccaa';
        $options->imageTransparent = true;
        $options->transparencyColor = '#ccccaa';
        $options->drawLightModules = true;
        $options->drawCircularModules = true;
        $options->circleRadius = 0.4;
        $options->keepAsSquare = [
            QRMatrix::M_FINDER_DARK,
            QRMatrix::M_FINDER_DOT,
            QRMatrix::M_ALIGNMENT_DARK,
        ];
        $options->moduleValues = [
                // finder
            QRMatrix::M_FINDER_DARK => '#A71111', // dark (true)
            QRMatrix::M_FINDER_DOT => '#A71111', // finder dot, dark (true)
            QRMatrix::M_FINDER => '#FFBFBF', // light (false)
                // alignment
            QRMatrix::M_ALIGNMENT_DARK => '#A70364',
            QRMatrix::M_ALIGNMENT => '#FFC9C9',
                // timing
            QRMatrix::M_TIMING_DARK => '#98005D',
            QRMatrix::M_TIMING => '#FFB8E9',
                // format
            QRMatrix::M_FORMAT_DARK => '#003804',
            QRMatrix::M_FORMAT => '#CCFB12',
                // version
            QRMatrix::M_VERSION_DARK => '#650098',
            QRMatrix::M_VERSION => '#E0B8FF',
                // data
            QRMatrix::M_DATA_DARK => '#4A6000',
            QRMatrix::M_DATA => '#ECF9BE',
                // darkmodule
            QRMatrix::M_DARKMODULE => '#080063',
                // separator
            QRMatrix::M_SEPARATOR => '#DDDDDD',
                // quietzone
            QRMatrix::M_QUIETZONE => '#DDDDDD',
        ];


        $out = (new QRCode($options))->render($workshop->uuid);

        echo $out;
    }

    /**
     * Restrict access to page at certain conditions
     * @return \Illuminate\Http\RedirectResponse
     */
    public function restrictIfPaid(Workshop $workshop)
    {
        if ($workshop->has_payment) {
            return redirect(route('registration.completed', $workshop));
        }

        return null;
    }

    /**
     * Restrict access to page at certain conditions
     * @return \Illuminate\Http\RedirectResponse
     */
    public function restrictIfConfirmed(Workshop $workshop)
    {
        if ($workshop->is_confirmed) {
            return redirect(route('registration.status', $workshop));
        }

        return null;
    }

    /**
     * Restrict access to page at certain conditions
     * @return \Illuminate\Http\RedirectResponse
     */
    public function restrictIfNotFormSubmitted(Workshop $workshop)
    {
        if (!$workshop->has_submitted) {
            return redirect(route('registration.index', $workshop));
        }

        return null;
    }
}
