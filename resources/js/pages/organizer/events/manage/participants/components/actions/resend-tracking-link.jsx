import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";

export default memo(function ResendTrackingLink({ value }) {
    const [processing, setProcessing] = useState(false);
    return (
        <>
            <div
                title="Resend Invitation"
                className="cursor-pointer flex items-center justify-start gap-x-2 "
                onClick={async (e) => {
                    if (processing) return;

                    setProcessing(true);
                    try {
                        await axios.get(
                            route(
                                "organizer.participant.resend-tracking-link",
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
                    icon={faQrcode}
                    className={`h-5 text-primary hover-pointer group-hover:text-slate-200 ${
                        processing ? "animate-bounce" : ""
                    }`}
                />
                Resend Tracking Link
            </div>
        </>
    );
});
