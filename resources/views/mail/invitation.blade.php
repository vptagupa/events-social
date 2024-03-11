<x-mail::message>
<p>Hello {{ $workshop->name ?: ''}}, </p>

<p>We are excited to invite you to join us for {{ $workshop->event->title }}! As a valued member of our community, we would be delighted to have you participate in this event.</p>
<p>Event Details:</p>
<p>Event: {{ $workshop->event->title }}</p>
<p>Date: {{ $workshop->event->expected_start_at->format('m/d/Y') }}</p>
<p>Time: {{ $workshop->event->expected_start_at->format('h:i a') }}</p>
<p>Place: {{ $workshop->event->place }}</p>
<p>Address: {{ $workshop->event->address }}</p>

<p>To continue editing or checking the status of your application, please use the link below.</p>

<x-mail::button :url="url(route('invitation.accepted', $workshop->uuid))">
Continue
</x-mail::button>

<p>The organizer will scan the QR code below for verification and attendance.</p>
<div style="width: 100%; text-align:center;">
<img src="https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl={{$workshop->uuid}}&choe=UTF-8" alt="{{$workshop->uuid}}" style="width: 200px;text-align:center;" />
</div>

<p>If you have any questions or need further information, feel free to contact us.</p>

<p>We look forward to seeing you at the event!</p>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
