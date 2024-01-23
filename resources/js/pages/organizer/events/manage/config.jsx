import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const menus = [
    {
        name: "Registration Form",
        url: (event) =>
            route("organizer.events.registration-form.index", event),
        icon: (
            <FontAwesomeIcon
                icon={faAddressCard}
                title="Registration Form"
                className="h-10 hover:scale-150 hover:text-primary transition ease-in-out duration-200"
            />
        ),
    },
    {
        name: "Upload Banner",
        url: () => "",
        icon: (
            <FontAwesomeIcon
                icon={faAddressCard}
                title="Upload Banner"
                className="h-10 hover:scale-150 hover:text-secondary transition ease-in-out duration-200"
            />
        ),
    },
    {
        name: "Members",
        url: () => "",
        icon: (
            <FontAwesomeIcon
                icon={faAddressCard}
                title="Members"
                className="h-10 hover:scale-150 hover:text-info transition ease-in-out  duration-200"
            />
        ),
    },
    {
        name: "Participants",
        url: () => "",
        icon: (
            <FontAwesomeIcon
                icon={faAddressCard}
                title="Participants"
                className="h-10 hover:scale-150 hover:text-info transition ease-in-out  duration-200"
            />
        ),
    },
    {
        name: "Certificate",
        url: () => "",
        icon: (
            <FontAwesomeIcon
                icon={faAddressCard}
                title="Certificate"
                className="h-10 hover:scale-150 hover:text-success transition ease-in-out  duration-200"
            />
        ),
    },
    {
        name: "Official Receipt",
        url: () => "",
        icon: (
            <FontAwesomeIcon
                icon={faAddressCard}
                title="Official Receipt"
                className="h-10 hover:scale-150 hover:text-info transition ease-in-out  duration-200"
            />
        ),
    },
];
