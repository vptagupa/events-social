import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";
import { memo } from "react";
import { faWpforms } from "@fortawesome/free-brands-svg-icons";

export default memo(function RegistrationForm({ value }) {
    return (
        <>
            <Link
                href={route("organizer.events.participants.show", {
                    event: value.workshops[0].event_id,
                    participant: value.id,
                })}
                title="Registration Form"
                className="cursor-pointer"
            >
                <FontAwesomeIcon
                    icon={faWpforms}
                    className="h-5 text-pink-300 hover:text-pink-600 hover:scale-105 transition-all duration-100"
                />
            </Link>
        </>
    );
});
