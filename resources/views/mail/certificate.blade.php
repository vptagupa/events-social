<x-mail::message>
<p>Hello {{$name}},</p>

<p>We are pleased to inform you that your attendance certificate for the {{$event}} is now available for download.</p>

<p>Please find the attached file to access your certificate.</p>

<p>If you have any questions or encounter any issues while downloading your certificate, please don't hesitate to reach out to us. We're here to assist you.</p>

Best regards,,<br>
{{ config('app.name') }}
</x-mail::message>
