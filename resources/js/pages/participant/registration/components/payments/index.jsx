import { Link } from "@inertiajs/react";
import Row from "../row";
import { currency } from "@/js/helpers";

export default function Payment({ workshop }) {
    console.log(workshop);
    return (
        <div className="flex flex-col gap-y-3">
            <Row name="Payments Logs" value="" />
            <div className="w-full text-xs pl-5 flex flex-col gap-y-2">
                {workshop.transactions.map((trans) => (
                    <div
                        key={trans.id}
                        className="w-full flex flex-col items-center gap-y-1"
                    >
                        <div className="w-full flex items-center justify-between gap-x-2">
                            <div className="font-bold">Charges</div>
                            <div>{currency(parseFloat(trans.charges))}</div>
                        </div>
                        <div className="w-full flex items-center justify-between gap-x-2">
                            <div className="font-bold">Price</div>
                            <div>{currency(parseFloat(trans.price))}</div>
                        </div>
                        <div className="w-full flex items-center justify-between gap-x-2">
                            <div className="font-bold">Tax {trans.tax}%</div>
                            <div>{currency(parseFloat(trans.tax_amount))}</div>
                        </div>
                        <div className="w-full flex items-center justify-between gap-x-2">
                            <div className="font-bold">Method</div>
                            {trans.is_gateway && "Gateway"}
                            {!trans.is_gateway && (
                                <Link className="underline">Upload</Link>
                            )}
                        </div>
                        <div className="w-full flex items-center justify-between gap-x-2">
                            <div className="font-bold">Total Price</div>
                            <div>
                                {currency(parseFloat(trans.expected_price))}
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-between gap-x-2">
                            <div className="font-bold">Amount Paid</div>
                            <div>
                                {currency(parseFloat(trans.actual_paid_amount))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
