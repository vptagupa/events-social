<div style="width:100%;position:relative;">
    <!-- <div style="font-size:20px; position:absolute; left:650px;top:80px;">{{ $workshop->or_no }}</div> -->
    <div style="font-size:20px; position:absolute; left:570px;top:120px;">{{ \Carbon\Carbon::now()->subDays(1)->format('m/d/Y') }}</div>
    <div style="font-size:20px; position:absolute; left:335px;top:155px;">{{ str($workshop->name)->title() }}</div>
    <div style="font-size:20px; position:absolute; left:300px;top:175px;">{{ $workshop->institution }}</div>
    <div style="font-size:20px; position:absolute; left:360px;top:213px;">{{ str($fnAmountToWordsTranslation((float) $workshop->or_amount))->title() }}</div>
    <div style="font-size:20px; position:absolute; left:615px;top:230px;">{{ number_format($workshop->or_amount,2) }}</div>
    <div style="font-size:20px; position:absolute; left:420px;top:250px;">37th Annual National Conference</div>
    <div style="font-size:20px; position:absolute; left:130px;top:250px;">{{ $workshop->or_check_no  ? '' : number_format($workshop->or_amount,2) }}</div>
    @if($workshop->or_check_no)
    <div style="font-size:20px; position:absolute; left:130px;top:290px;">{{ $workshop->or_bank }}</div>
    <div style="font-size:20px; position:absolute; left:130px;top:310px;">{{ $workshop->or_check_no }}</div>
    <div style="font-size:20px; position:absolute; left:130px;top:330px;">{{ $workshop->or_check_date->format('m/d/Y') }}</div>
    <div style="font-size:20px; position:absolute; left:130px;top:350px;">{{ number_format($workshop->or_amount,2) }}</div>
    @endif
</div>