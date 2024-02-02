import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@inertiajs/react";

export default function Event({ value, ...props }) {
    return (
        <Link
            href={route("organizer.events.index", value)}
            title="Visit Events"
        >
            <FontAwesomeIcon
                icon={faCalendar}
                className="h-5 text-amber-300 hover:text-amber-600 hover:scale-105 transition-all duration-100"
            />
        </Link>
    );
}
