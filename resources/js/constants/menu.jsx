import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default [
    {
        id: "events",
        name: "Events",
        icon: <FontAwesomeIcon icon={faUser} className="h-[0.60rem]" />,
        route: "organizer.events.index",
        permission: "EVENTS",
    },
    {
        id: "fees",
        name: "Fees",
        icon: <FontAwesomeIcon icon={faUser} className="h-[0.60rem]" />,
        route: "organizer.fees.default",
        permission: "FEES",
    },
    {
        id: "organizers",
        name: "Organizers",
        icon: <FontAwesomeIcon icon={faUser} className="h-[0.60rem]" />,
        route: "admin.backend.organizers.index",
        permission: "ORGANIZERS",
    },

    {
        id: "setup",
        name: "Setup",
        icon: <FontAwesomeIcon icon={faUser} className="h-[0.60rem]" />,
        route: "admin.backend.setup.*",
        permission: "SETUP",
        children: [
            {
                id: "fees",
                name: "Fees",
                icon: <FontAwesomeIcon icon={faUser} className="h-[0.60rem]" />,
                route: "admin.backend.setup.fees.index",
                permission: "FEES",
            },
        ],
    },
    {
        id: "users",
        name: "Users",
        icon: <FontAwesomeIcon icon={faUser} className="h-[0.60rem]" />,
        route: "admin.backend.users.index",
        permission: "USERS",
    },
];
