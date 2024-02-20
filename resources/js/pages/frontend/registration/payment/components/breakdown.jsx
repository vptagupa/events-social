import { currency } from "@/js/helpers";
import { useState, useEffect } from "react";

export default function Breakdown({ workshop }) {
    const [data, setData] = useState(null);
    const [processing, setProcessing] = useState(false);

    const breakdown = () => {
        setProcessing(true);
        axios
            .get(route("registration.priceBreakdown", workshop.uuid))
            .then((res) => {
                setData(res.data);
                setProcessing(false);
            });
    };

    useEffect(() => {
        breakdown();
    }, []);

    if (!data) {
        return <>Calculating...</>;
    }

    return (
        <div className="w-full flex flex-col gap-y-2 mt-3">
            <div className="w-full flex items-center justify-between border-b border-slate-500/60">
                <div>Total Charges:</div>
                <div>{currency(data.total_fees)}</div>
            </div>
            <div className="w-full flex items-center justify-between border-b border-slate-500/60">
                <div>Tax ({data.tax}):</div>
                <div>{currency(data.tax_amount)}</div>
            </div>
            <div className="w-full flex items-center justify-between border-b-0 border-slate-500/60">
                <div>Total Price:</div>
                <div>{currency(data.total)}</div>
            </div>
        </div>
    );
}
