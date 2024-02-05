import OrganizerFees from "./organizer";
import SystemFees from "./system";
import { currency } from "@/js/helpers";
import { memo } from "react";

export default memo(function Fees({ event, payment }) {
    return (
        <>
            <div>Organizer Fees</div>
            <hr />
            <OrganizerFees event={event} />
            <div>System Fees</div>
            <hr />
            <SystemFees event={event} />
            <hr />
            <div className="font-bold flex items-center justify-between">
                <span>Total Fees</span>
                <span>{currency(payment.total)}</span>
            </div>
        </>
    );
});
