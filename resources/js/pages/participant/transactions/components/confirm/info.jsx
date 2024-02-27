import { memo } from "react";
import { dateDisplay, currency } from "@/js/helpers";

export default memo(function Info({ value, meta }) {
    return (
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-lg p-3 ml-5">
            <div className="w-full flex items-center justify-between border-b-0 border-slate-300">
                <div className="w-full uppercase">
                    {value.workshop.participant.name}
                </div>
            </div>
            <div className="w-full flex items-center justify-between border-b-0 border-slate-300">
                <div className="w-full">
                    Date: {dateDisplay(value.created_at)}
                </div>
            </div>
            <div className="w-full flex items-center justify-between border-b-0 border-slate-300">
                <div className="w-full">Ref #: {value.reference}</div>
            </div>
            <div className="w-full flex items-center justify-between border-b-0 border-slate-300">
                <div className="w-full">
                    Total Due:{" "}
                    {currency(parseFloat(value?.workshop?.amount ?? 0))}
                </div>
            </div>
            <div className="w-full flex items-center justify-between border-b-0 border-slate-300">
                <div className="w-full">
                    Total Paid: {currency(parseFloat(meta?.paid ?? 0))}
                </div>
            </div>
            <div className="w-full flex items-center justify-between border-b-0 border-slate-300">
                <div className="w-full">
                    Balance: {currency(parseFloat(meta?.balance ?? 0))}
                </div>
            </div>
        </div>
    );
});
