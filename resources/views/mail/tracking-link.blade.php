<x-mail::message>
<p>Hello {{ $workshop->name ?: ''}}, </p>

<p>Thank you for participating for this coming event on {{ $workshop->event->expected_start_at->format('F j, Y, h:i a ') }}.</p>
<p>Event: {{ $workshop->event->title }}</p>
<p>Place: {{ $workshop->event->place }}</p>
<p>Address: {{ $workshop->event->address }}</p>

<p>To continue editing or checking the status of your application, please use the link below.</p>

<x-mail::button :url="url(route('registration.index', $workshop->uuid))">
Continue
</x-mail::button>

<p>The organizer will scan the QR code below for verification and attendance.</p>
<div style="width: 100%; text-align:center;">
    <img src="https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl={{$workshop->uuid}}&choe=UTF-8" alt="{{$workshop->uuid}}" style="width: 200px;text-align:center;" />
</div>

<p>See you!</p>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
