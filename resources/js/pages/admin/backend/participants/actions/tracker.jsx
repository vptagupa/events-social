import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import { Link } from "@inertiajs/react";

export default memo(function Tracker({ value }) {
    return (
        <>
            <Link
                as="a"
                href={route("registration.index", value.workshops[0].uuid)}
                title="View Registration Status"
                target="blank"
                className="cursor-pointer flex items-center justify-start gap-x-2 "
            >
                <FontAwesomeIcon
                    icon={faBoxesStacked}
                    className="h-5 text-primary hover-pointer group-hover:text-slate-200"
                />
            </Link>
        </>
    );
});
