import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faUserCircle,
    faCalendar,
    faFileInvoiceDollar,
    faHammer,
    faUserGroup,
    faReceipt,
    faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

export default [
    {
        id: "events",
        name: "Events",
        icon: <FontAwesomeIcon icon={faCalendar} className="text-lg" />,
        route: "organizer.events.any",
        permission: "EVENTS",
    },
    {
        id: "fees",
        name: "Fees",
        icon: (
            <FontAwesomeIcon icon={faFileInvoiceDollar} className="text-lg" />
        ),
        route: "organizer.fees.any",
        permission: "FEES",
    },
    {
        id: "organizers",
        name: "Organizers",
        icon: <FontAwesomeIcon icon={faUserCircle} className="text-lg" />,
        route: "admin.backend.organizers.index",
        permission: "ORGANIZERS",
    },
    {
        id: "participants",
        name: "Participants",
        icon: <FontAwesomeIcon icon={faUserGroup} className="text-lg" />,
        route: "admin.backend.participants.index",
        permission: "PARTICIPANTS",
    },
    {
        id: "payments",
        name: "Payments",
        icon: <FontAwesomeIcon icon={faReceipt} className="text-lg" />,
        route: "organizer.participants.payments.index",
        permission: "PAYMENTS",
    },
    {
        id: "setup",
        name: "Setup",
        icon: <FontAwesomeIcon icon={faHammer} className="text-lg" />,
        route: "admin.backend.setup.*",
        permission: "SETUP",
        children: [
            {
                id: "fees",
                name: "Fees",
                icon: (
                    <FontAwesomeIcon
                        icon={faFileInvoiceDollar}
                        className="text-lg"
                    />
                ),
                route: "admin.backend.setup.fees.index",
                permission: "SETUP_FEES",
            },
        ],
    },
    {
        id: "users",
        name: "Users",
        icon: <FontAwesomeIcon icon={faUser} className="text-lg" />,
        route: "admin.backend.users.index",
        permission: "USERS",
    },
    {
        id: "audit",
        name: "Audit Trails",
        icon: <FontAwesomeIcon icon={faShieldHalved} className="text-lg" />,
        route: "admin.backend.audit.index",
        permission: "AUDIT_TRAILS",
    },
];
