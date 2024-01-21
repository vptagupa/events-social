import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default [
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
