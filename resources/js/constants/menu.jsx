import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default [
    {
        id: "configurations",
        name: "Configurations",
        icon: <FontAwesomeIcon icon={faUser} className="h-[0.60rem]" />,
        route: "admin.config",
        permission: "CONFIGURATIONS",
    },
    {
        id: "setup",
        name: "Setup",
        icon: <FontAwesomeIcon icon={faUser} className="h-[0.60rem]" />,
        route: "admin.setup.*",
        permission: "CONFIGURATIONS",
        children: [
            {
                id: "account.types",
                name: "Departments",
                icon: <FontAwesomeIcon icon={faUser} className="h-[0.60rem]" />,
                route: "admin.setup.index",
                permission: "ACCOUNT_TYPES",
            },
        ],
    },
    {
        id: "users",
        name: "Users",
        icon: <FontAwesomeIcon icon={faUser} className="h-[0.60rem]" />,
        route: "admin.users",
        permission: "USERS",
    },
    {
        id: "audit",
        name: "Audit Trails",
        icon: <FontAwesomeIcon icon={faUser} className="h-[0.60rem]" />,
        route: "admin.audits",
        permission: "AUDIT",
    },
];
