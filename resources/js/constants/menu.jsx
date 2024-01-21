import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default [
    {
        id: "users",
        name: "Users",
        icon: <FontAwesomeIcon icon={faUser} className="h-[0.60rem]" />,
        route: "admin.backend.users.index",
        permission: "USERS",
    },
];
