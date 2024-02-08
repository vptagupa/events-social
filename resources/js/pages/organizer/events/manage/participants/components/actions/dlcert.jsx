import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

export default memo(function DownloadCert({ value }) {
    return (
        <>
            <div
                title="Remove"
                className="cursor-pointer flex items-center justify-start gap-x-2 "
            >
                <FontAwesomeIcon
                    icon={faCertificate}
                    className="h-5 text-primary hover-pointer group-hover:text-slate-200"
                />
                Download Certificate
            </div>
        </>
    );
});
