<div style="width:100%;position:relative;">
    <div style="width:40%;position:absolute;">
        <table>
            <tbody>
                <tr>    
                    <td width="50%" class="center">Billing Invoice No.</td>
                    <td width="35%" class="border-left center">Amount</td>
                    <td width="15%" class="border-left">&nbsp;</td>
                </tr>
                <tr>    
                    <td class="blank"></td>
                    <td class="blank border-left"></td>
                    <td class="border-left blank"></td>
                </tr>
                <tr>    
                    <td class="blank"></td>
                    <td class="blank border-left"></td>
                    <td class="border-left blank"></td>
                </tr>
                <tr>    
                    <td class="blank"></td>
                    <td class="blank border-left"></td>
                    <td class="border-left blank"></td>
                </tr>
                <tr>    
                    <td class="blank"></td>
                    <td class="blank border-left"></td>
                    <td class="border-left blank"></td>
                </tr>
                <tr>    
                    <td class="blank"></td>
                    <td class="blank border-left"></td>
                    <td class="border-left blank"></td>
                </tr>
                <tr>    
                    <td>Total Sales:</td>
                    <td class="border-left"></td>
                    <td></td>
                </tr>
                <tr>    
                    <td class="border-left">Less: Withholding Tax</td>
                    <td class="border-left"></td>
                    <td></td>
                </tr>
                <tr>    
                    <td class="border-left">Payment Due</td>
                    <td class="border-left"></td>
                    <td></td>
                </tr>
                <tr>    
                    <td class="blank"></td>
                    <td class="blank"></td>
                    <td class="blank"></td>
                </tr>
                <tr>    
                    <td>CASH</td>
                    <td class="border-left"></td>
                    <td class="blank"></td>
                </tr>
                <tr>    
                    <td>CHECK</td>
                    <td class="blank"></td>
                    <td class="blank"></td>
                </tr>
                <tr>    
                    <td>BANK</td>
                    <td class="border-left"></td>
                    <td class="blank"></td>
                </tr>
                <tr>    
                    <td>CHECK NO.</td>
                    <td class="border-left"></td>
                    <td class="blank"></td>
                </tr>
                <tr>    
                    <td>CHECK DATE</td>
                    <td class="border-left"></td>
                    <td class="blank"></td>
                </tr>
                <tr>    
                    <td>AMOUNT</td>
                    <td class="border-left"></td>
                    <td class="blank"></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div style="width:60%;border: 0px solid red;position:absolute; left:40%;padding:4px;">
        <table style="width:99%;border: 0px none;">
            <tbody>
                <tr>
                    <td class="uppercase center no-border heading-2 no-padding" style="padding: 0 !important;">Accreditiing Agency of Chartered Colleges & UP, Inc.</td>
                </tr>
                    <tr>
                    <td class="center no-border" style="padding: 0 !important;">812 Future Point Plaza 112 Panay Ave., South Triangle 1103</td>
                </tr>
                <tr>
                    <td class="center no-border no-padding" style="padding: 0 !important;">Quezon City, NCR, Second District, Philippines</td>
                </tr>
                <tr>
                    <td class="center no-border" style="padding: 0 !important;">Tel. No.:415-9016</td>
                </tr>
                <tr>
                    <td class="center no-border" style="padding: 0 !important;position:relative;">
                        NON-VAT Reg. TIN: 211-408-111-00000
                        <div style="position:absolute;font-weight:bold;font-size:1.5rem;color:red;right:15px;top: -15px;">NO. {{ $workshop->or_no }}</div>
                    </td>
                </tr>
            </tbody>
        </table>
        <table style="width:99%;border: 0px solid #000;">
            <tbody>
                <tr>
                    <td width="60%" class="no-border uppercase heading-1" style="font-weight:bold;">Official Receipt</td>
                    <td class="no-border italic text-underline-date" data-value="{{ \Carbon\Carbon::now()->format('m/d/Y') }}">Date</td>
                </tr>
            </tbody>
        </table>
        <table style="width:99%;border: 0px solid #000;">
            <tbody>
                <tr>
                    <td class="no-border italic text-underline-receive-from" data-value="{{ str($participant->name)->title() }}">Receive from</td>
                </tr>
            </tbody>
        </table>
        <table style="width:99%;border: 0px solid #000;">
            <tbody>
                <tr>
                    <td class="no-border italic text-underline-address" data-value="&nbsp;">Address</td>
                </tr>
            </tbody>
        </table>
        <table style="width:99%;border: 0px solid #000;">
            <tbody>
                <tr>
                    <td width="70%" class="no-border italic text-underline-bus-style" data-value="&nbsp;">Bus. Style/Name</td>
                    <td class="no-border italic text-underline-tin">TIN</td>
                </tr>
            </tbody>
        </table>
        <table style="width:99%;border: 0px solid #000;">
            <tbody>
                <tr>
                    <td class="no-border italic text-underline-amount-words" data-value="{{ $amountWords($workshop->price ?? 0) }}">the sum of Pesos</td>
                </tr>
            </tbody>
        </table>
        <table style="width:99%;border: 0px solid #000;">
            <tbody>
                <tr>
                    <td width="70%" class="no-border italic text-underline-amount-words-2" data-value="&nbsp;">&nbsp;</td>
                    <td class="no-border italic text-underline-amount" data-value="P{{ $workshop->price }}"></td>
                </tr>
            </tbody>
        </table>
        <table style="width:99%;border: 0px solid #000;">
            <tbody>
                <tr>
                    <td class="no-border italic text-underline-partial-payment" data-value="&nbsp;">in full partial payment of</td>
                </tr>
            </tbody>
        </table>
        <table style="width:99%;border: 0px solid #000;margin-top:10px;">
            <tbody>
                <tr>
                    <td style="width:50%" class="no-border">
                        <table style="width:99%;border: 0px solid #000;">
                            <tbody>
                                <tr>
                                    <td style="width:15%" class="no-border" >
                                        &nbsp;
                                    </td>
                                    <td style="width:85%" class="no-border" style="font-size: 0.6rem;">
                                        200Bklts (50x2) 37501 - 47500 <br />
                                        BIR Authority to print OCN: 039AU20240000000615 <br />
                                        Date of ATP: January 25, 2024 <br />
                                        TOP 7 Printing Services <br />
                                        Katherine Joy B. Marcilla - Prop. <br />
                                        1807 C.M. Recto Ave., Zone 041 Brgy. 395 Quiapo, Manila <br />
                                        TIN: 225-827-266-00000 NON-VAT <br />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td style="width:50%" class="no-border">
                        <table style="width:99%;border: 0px solid #000;">
                            <tbody>
                                <tr>
                                    <td class="no-border italic text-underline-signatory" data-value="{{ $workshop->event->official_receipt_signatory }}">By:</td>
                                </tr>
                                <tr>
                                    <td class="no-border" style="position:relative;">
                                        <img src="{{ $workshop->event->officialReceiptSignature->url }}" style="position:absolute;top:-70px;left:50px;width:100px;" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="no-border italic text-underline-signatory-label">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="width:100%;font-size: 0.6rem;" class="no-border">
                                        Printer's Accreditation No. 032MP20240000000003 <br />
                                        Date of Accreditation: 01-05-2024
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="width:100%;font-size: 0.9rem;font-weight:bold;" colspan="2"  class="no-border center">
                        "THIS DOCUMENT IS NOT VALID FOR CLAIMING INPUT TAXES"
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>