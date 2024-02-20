import { currency, dateDisplay } from "@/js/helpers";
import { Link } from "@inertiajs/react";

export default function Payment({ value }) {
    return (
        <div className="w-full flex flex-col items-center gap-y-1 border-b border-slate-300 py-1">
            <div className="w-full flex items-center justify-between gap-x-2">
                <div className="font-bold">Date</div>
                <div className="text-xs">
                    {currency(dateDisplay(value.created_at))}
                </div>
            </div>
            <div className="w-full flex items-center justify-between gap-x-2">
                <div className="font-bold">Ref #</div>
                <div>{value.reference}</div>
            </div>
            <div className="w-full flex items-center justify-between gap-x-2">
                <div className="font-bold">Charges</div>
                <div>{currency(parseFloat(value.charges))}</div>
            </div>
            <div className="w-full flex items-center justify-between gap-x-2">
                <div className="font-bold">Price</div>
                <div>{currency(parseFloat(value.price))}</div>
            </div>
            <div className="w-full flex items-center justify-between gap-x-2">
                <div className="font-bold">Tax {value.tax}</div>
                <div>{currency(parseFloat(value.tax_amount))}</div>
            </div>
            <div className="w-full flex items-center justify-between gap-x-2">
                <div className="font-bold">Method</div>
                {value.is_gateway && "Gateway"}
                {!value.is_gateway && (
                    <a
                        href={value.file.url}
                        target="_blank"
                        className="hover:underline text-blue-500"
                    >
                        File
                    </a>
                )}
            </div>
            <div className="w-full flex items-center justify-between gap-x-2">
                <div className="font-bold">Total Price</div>
                <div>{currency(parseFloat(value.expected_price))}</div>
            </div>
            <div className="w-full flex items-center justify-between gap-x-2">
                <div className="font-bold">Amount Paid</div>
                <div>{currency(parseFloat(value.actual_paid_amount))}</div>
            </div>
            <div className="w-full flex items-center justify-between gap-x-2">
                <div className="font-bold">Status</div>
                <div>
                    {value.failed_at && (
                        <div
                            className="text-danger"
                            title={value.failed_reason}
                        >
                            Failed
                        </div>
                    )}
                    {!value.failed_at && "For Review"}
                </div>
            </div>
        </div>
    );
}
