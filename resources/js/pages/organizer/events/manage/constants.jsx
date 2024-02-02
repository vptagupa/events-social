import { faWpforms } from "@fortawesome/free-brands-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import {
    faCertificate,
    faCircleInfo,
    faFileInvoice,
    faPerson,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const menuIconClasses =
    "h-8 hover:scale-125 hover:text-primary hover:transform hover:-rotate-45 transition ease-in-out duration-200";

export const menus = [
    {
        title: "Registration Form",
        url: (event) =>
            route("organizer.events.registration-form.index", event),
        icon: (
            <FontAwesomeIcon
                icon={faWpforms}
                title="Registration Form"
                className={`${menuIconClasses}`}
            />
        ),
    },
    {
        title: "Details",
        url: (event) => route("organizer.events.edit", event),
        icon: (
            <FontAwesomeIcon
                icon={faCircleInfo}
                title="Detail and Schedule"
                className={`${menuIconClasses}`}
            />
        ),
    },
    {
        title: "Upload Banner",
        url: () => "",
        icon: (
            <FontAwesomeIcon
                icon={faImage}
                title="Upload Banner"
                className={`${menuIconClasses}`}
            />
        ),
    },
    {
        title: "Members",
        url: () => "",
        icon: (
            <FontAwesomeIcon
                icon={faUsers}
                title="Members"
                className={`${menuIconClasses} hover:!scale-110`}
            />
        ),
    },
    {
        title: "Participants",
        url: () => "",
        icon: (
            <FontAwesomeIcon
                icon={faPerson}
                title="Participants"
                className={`${menuIconClasses} !h-7`}
            />
        ),
    },
    {
        title: "Certificate",
        url: () => "",
        icon: (
            <FontAwesomeIcon
                icon={faCertificate}
                title="Certificate"
                className={`${menuIconClasses}`}
            />
        ),
    },
    {
        title: "Official Receipt",
        url: () => "",
        icon: (
            <FontAwesomeIcon
                icon={faFileInvoice}
                title="Official Receipt"
                className={`${menuIconClasses}`}
            />
        ),
    },
];
