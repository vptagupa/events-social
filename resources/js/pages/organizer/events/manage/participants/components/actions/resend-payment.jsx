import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

export default memo(function ResendPaymentForm({ value }) {
    const [processing, setProcessing] = useState(false);
    return (
        <>
            <div
                title="Resend Payment Form"
                className="cursor-pointer flex items-center justify-start gap-x-2 "
                onClick={async (e) => {
                    if (processing) return;

                    setProcessing(true);
                    try {
                        await axios.get(
                            route(
                                "organizer.participant.resend-payment",
                                value.workshops[0].id
                            )
                        );
                    } catch (error) {
                    } finally {
                        setProcessing(false);
                    }
                }}
            >
                <FontAwesomeIcon
                    icon={faCreditCard}
                    className={`h-5 text-primary hover-pointer group-hover:text-slate-200 ${
                        processing ? "animate-bounce " : ""
                    }`}
                />
                Resend Payment Form
            </div>
        </>
    );
});
