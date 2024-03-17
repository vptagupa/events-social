<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF</title>
    <style type="text/css">
        @page{ 
            margin: 2px; 
            padding: 2; 
            font-size: 0.7rem;
        }
      
        .heading-1 {
            font-size: 1.5rem;
        }
        .heading-2 {
            font-size: 1rem;
            font-weight: bold;
        }
        table, th, td {
            border-collapse: collapse;
        }
        td {
            padding: 0.3rem;
            /* border-bottom: 1px solid #000; */
        }
        table {
            width: 100%;
            /* border: 1px solid #000; */
        }
        .no-padding: {
            padding: 0 !important;
        }
        .border-left {
            border-left: 1px solid #000;
        }
        .blank {
            padding: 0.7rem;
        }
        .uppercase {
            text-transform: uppercase;
        }
        .center {
            text-align: center;
        }
        .right {
            text-align: right;
        }
        .no-border {
            border: 0px none;
        }
        .italic {
            font-style: italic;
        }
        .text-underline-date {
           position: relative;
        }
        .text-underline-date:after {
           content: attr(data-value);
           width: 80%;
           position: absolute;
           top: 3px;
           margin-left:4px;
           text-align: center;
           /* border-bottom: 1px solid #000; */
        }
        .text-underline-receive-from {
           position: relative;
        }
        .text-underline-receive-from:after {
           content: attr(data-value);
           width: 84.1%;
           position: absolute;
           top: 0px;
           margin-left:4px;
           text-align: center;
           /* border-bottom: 1px solid #000; */
        }
        .text-underline-address {
           position: relative;
        }
        .text-underline-address:after {
            content: attr(data-value);
            width: 89%;
            position: absolute;
            top: 0px;
            margin-left:4px;
            text-align: center;
            /* border-bottom: 1px solid #000; */
        }
        .text-underline-bus-style {
           position: relative;
        }
        .text-underline-bus-style:after {
            content: attr(data-value);
            width: 76.5%;
            position: absolute;
            top: 0px;
            margin-left:4px;
            text-align: center;
            /* border-bottom: 1px solid #000; */
        }
        .text-underline-tin {
           position: relative;
        }
        .text-underline-tin:after {
            content: attr(data-value);
            width: 75.9%;
            position: absolute;
            top: 12px;
            margin-left:4px;
            text-align: center;
            /* border-bottom: 1px solid #000; */
        }
        .text-underline-amount-words {
           position: relative;
        }
        .text-underline-amount-words:after {
            content: attr(data-value);
            width: 80.7%;
            position: absolute;
            top: 0px;
            margin-left:4px;
            text-align: center;
            /* border-bottom: 1px solid #000; */
        }
        .text-underline-amount-words-2 {
           position: relative;
        }
        .text-underline-amount-words-2:after {
            content: attr(data-value);
            width: 99%;
            position: absolute;
            top: 0px;
            margin-left:0px;
            text-align: center;
            /* border-bottom: 1px solid #000; */
        }
        .text-underline-amount {
           position: relative;
        }
        .text-underline-amount:after {
           content: attr(data-value);
           width: 88.3%;
           position: absolute;
           top: 0px;
           margin-left:4px;
           text-align: left;
           /* border-bottom: 1px solid #000; */
        }
        .text-underline-partial-payment {
           position: relative;
        }
        .text-underline-partial-payment:after {
            content: attr(data-value);
            width: 72.8%;
            position: absolute;
            top: 0px;
            margin-left:4px;
            text-align: center;
            /* border-bottom: 1px solid #000; */
        }
        .text-underline-signatory {
           position: relative;
        }
        .text-underline-signatory:after {
            content: attr(data-value);
            width: 89%;
            position: absolute;
            top: 0px;
            margin-left:4px;
            text-align: center;
            /* border-bottom: 1px solid #000; */
        }
        .text-underline-signatory-label {
            position: relative;
        }
        .text-underline-signatory-label:before {
            content: "Authorized Signatory";
            padding: 0 !important;
            width: 99%;
            top: -6px;
            position: absolute;
            text-align: center;
        }
        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>
    @foreach($participants as $participant)
        @include('components/receipt-body', [
        'participant' => $participant,
        'workshop' => $participant->workshops->first()
    ])
        @if(!$loop->last)
        <div class="page-break"></div>
        @endif
    @endforeach 
</body>
</html>