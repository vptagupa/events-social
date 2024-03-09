import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";

export default function Verifier({ value }) {
    return (
        <Link
            title="Remove"
            className="cursor-pointer flex items-center justify-start gap-x-2"
            href={route(
                "organizer.events.participants.verifier.index",
                value.id
            )}
        >
            <FontAwesomeIcon
                icon={faShieldHalved}
                className="h-5 text-primary hover-pointer group-hover:text-slate-200"
            />
            Verifier
        </Link>
    );
}
