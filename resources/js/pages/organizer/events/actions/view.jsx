import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { Link, router } from "@inertiajs/react";
import { memo } from "react";
import { faEye } from "@fortawesome/free-regular-svg-icons";

export default memo(function View({ value }) {
    return (
        <>
            <Link
                title="View"
                href={route("event.index", value.slug)}
                className="flex items-center justify-start gap-x-2"
                target="_blank"
            >
                <FontAwesomeIcon
                    icon={faEye}
                    className="h-5 text-primary hover-pointer group-hover:text-slate-200"
                />
                View
            </Link>
        </>
    );
});
