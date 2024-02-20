import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";
import { memo } from "react";
import { faWpforms } from "@fortawesome/free-brands-svg-icons";

export default memo(function Participant({ value }) {
    return (
        <Link
            href={route("organizer.participant.index", value.workshops[0].id)}
            target="_blank"
            title="View Registration"
            className="cursor-pointer"
        >
            <FontAwesomeIcon
                icon={faWpforms}
                className="h-5 text-pink-300 hover:text-pink-600 hover:scale-105 transition-all duration-100"
            />
        </Link>
    );
});
