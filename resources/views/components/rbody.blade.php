<div style="width:100%;position:relative;">
    <!-- <div style="font-size:20px; position:absolute; left:650px;top:80px;">{{ $workshop->or_no }}</div> -->
    <div style="font-size:20px; position:absolute; left:570px;top:120px;">{{ \Carbon\Carbon::now()->subDays(1)->format('m/d/Y') }}</div>
    <div style="font-size:20px; position:absolute; left:335px;top:155px;">xx{{ str($workshop->name)->title() }}</div>
    <div style="font-size:20px; position:absolute; left:300px;top:175px;">Address</div>
    <div style="font-size:20px; position:absolute; left:360px;top:213px;">Three Thousand Pesos</div>
    <div style="font-size:20px; position:absolute; left:615px;top:230px;">{{ $workshop->price }}</div>
    <div style="font-size:20px; position:absolute; left:420px;top:250px;">37th Annual National Conference</div>
    <div style="font-size:20px; position:absolute; left:130px;top:250px;">cash{{ $workshop->price }}</div>
    <div style="font-size:20px; position:absolute; left:130px;top:290px;">Landbank</div>
    <div style="font-size:20px; position:absolute; left:130px;top:310px;">Check A</div>
    <div style="font-size:20px; position:absolute; left:130px;top:330px;">Check Date</div>
    <div style="font-size:20px; position:absolute; left:130px;top:350px;">Check Amount</div>
</div>