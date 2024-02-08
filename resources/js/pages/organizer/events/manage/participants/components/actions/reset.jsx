import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faKey } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import {
    faCreditCard,
    faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";

export default memo(function ResetPassword({ value }) {
    return (
        <>
            <div
                title="Remove"
                className="cursor-pointer flex items-center justify-start gap-x-2 "
            >
                <FontAwesomeIcon
                    icon={faKey}
                    className="h-5 text-primary hover-pointer group-hover:text-slate-200"
                />
                Reset Password
            </div>
        </>
    );
});
