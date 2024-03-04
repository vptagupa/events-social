import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

export default memo(function ResendInvitation({ value }) {
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
                                "organizer.participant.resend-invite",
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
                    icon={faPaperPlane}
                    className={`h-5 text-primary hover-pointer group-hover:text-slate-200 ${
                        processing ? "animate-bounce" : ""
                    }`}
                />
                Resend Invitation
            </div>
        </>
    );
});
