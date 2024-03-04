import { faWpforms } from "@fortawesome/free-brands-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import {
    faCertificate,
    faCircleInfo,
    faFileInvoice,
    faFileInvoiceDollar,
    faPerson,
    faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const menuIconClasses =
    "h-8 hover:scale-110 hover:text-primary hover:transform hover:-rotate-45 transition ease-in-out duration-200";

const isActive = (name) => (route().current(name) ? true : false);

export const menus = [
    {
        title: "Participants",
        url: ({ event }) =>
            route("organizer.events.participants.index", { event }),
        icon: () => (
            <FontAwesomeIcon
                icon={faPerson}
                title="Participants"
                className={`${menuIconClasses} ${
                    isActive("organizer.events.participants.index")
                        ? "text-primary transform -rotate-45 scale-110"
                        : ""
                } !h-7`}
            />
        ),
    },
    {
        title: "Registration Form",
        url: ({ event }) =>
            route("organizer.events.registration-form.index", event),
        icon: () => (
            <FontAwesomeIcon
                icon={faWpforms}
                title="Registration Form"
                className={`${menuIconClasses} ${
                    isActive("organizer.events.registration-form.index")
                        ? "text-primary transform -rotate-45 scale-110"
                        : ""
                }`}
            />
        ),
    },
    {
        title: "Details",
        url: ({ organizer, event }) =>
            route("organizer.events.edit", { organizer, event }),
        icon: () => (
            <FontAwesomeIcon
                icon={faCircleInfo}
                title="Detail and Schedule"
                className={`${menuIconClasses} ${
                    isActive("organizer.events.edit")
                        ? "text-primary transform -rotate-45 scale-110"
                        : ""
                }`}
            />
        ),
    },
    {
        title: "Pricing",
        url: ({ organizer, event }) =>
            route("organizer.events.pricing.index", { event }),
        icon: () => (
            <FontAwesomeIcon
                icon={faFileInvoiceDollar}
                title="Pricing"
                className={`${menuIconClasses} ${
                    isActive("organizer.events.pricing.index")
                        ? "text-primary transform -rotate-45 scale-105"
                        : ""
                } hover:!scale-105`}
            />
        ),
    },
    // {
    //     title: "Members",
    //     url: () => "",
    //     isActive: () => false,
    //     icon: () => (
    //         <FontAwesomeIcon
    //             icon={faUserClock}
    //             title="Members"
    //             className={`${menuIconClasses} !h-6 hover:!scale-105`}
    //         />
    //     ),
    // },
    // {
    //     title: "Upload Banner",
    //     url: () => "",
    //     isActive: () => false,
    //     icon: () => (
    //         <FontAwesomeIcon
    //             icon={faImage}
    //             title="Upload Banner"
    //             className={`${menuIconClasses}`}
    //         />
    //     ),
    // },
    {
        title: "Certificates",
        url: ({ organizer, event }) =>
            route("organizer.events.certificates.index", { event }),
        isActive: () => false,
        icon: () => (
            <FontAwesomeIcon
                icon={faCertificate}
                title="Certificates"
                className={`${menuIconClasses} ${
                    isActive("organizer.events.certificates.index")
                        ? "text-primary transform -rotate-45 scale-110"
                        : ""
                } !h-7`}
            />
        ),
    },
    {
        title: "Official Receipt",
        url: () => "",
        isActive: () => false,
        icon: () => (
            <FontAwesomeIcon
                icon={faFileInvoice}
                title="Official Receipt"
                className={`${menuIconClasses}`}
            />
        ),
    },
];
