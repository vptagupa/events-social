import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@inertiajs/react";

export default function Manage({ value }) {
    return (
        <>
            <div className="cursor-pointer" title="Manage" onClick={(e) => {}}>
                <Link
                    href={route(
                        "organizer.events.participants.index",
                        value.id
                    )}
                >
                    <FontAwesomeIcon
                        icon={faFilePen}
                        className="h-5 text-purple-300 hover:text-purple-600 hover:scale-105 transition-all duration-100"
                    />
                </Link>
            </div>
        </>
    );
}
