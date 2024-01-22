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
        id: "organizers",
        name: "Organizers",
        icon: <FontAwesomeIcon icon={faUser} className="h-[0.60rem]" />,
        route: "admin.backend.organizers.index",
        permission: "ORGANIZERS",
    },
    {
        id: "users",
        name: "Users",
        icon: <FontAwesomeIcon icon={faUser} className="h-[0.60rem]" />,
        route: "admin.backend.users.index",
        permission: "USERS",
    },
];
