import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleExclamation,
    faPesoSign,
    faUserPen,
    faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export const stats = [
    {
        title: "Registered",
        value: 99,
        className: "bg-gradient",
        icon: (
            <FontAwesomeIcon
                icon={faUserPen}
                className="h-4 w-5 p-3 bg-white text-cyan-600 rounded-md shadow-sm shadow-slate-800/40 border-transparent"
            />
        ),
    },
    {
        title: "Confirmed",
        value: 99,
        className: "",
        icon: (
            <FontAwesomeIcon
                icon={faCircleCheck}
                className="h-4 w-5  p-3 bg-white text-green-600 rounded-md shadow-sm shadow-slate-800/40 border-transparent"
            />
        ),
    },
    {
        title: "Paid",
        value: 99,
        className: "",
        icon: (
            <FontAwesomeIcon
                icon={faPesoSign}
                className="h-4 w-5 p-3 bg-white text-emerald-600 rounded-md shadow-sm shadow-slate-800/40 border-transparent"
            />
        ),
    },
    {
        title: "Unpaid",
        value: 99,
        className: "",
        icon: (
            <FontAwesomeIcon
                icon={faPesoSign}
                className="h-4 w-5 p-3 bg-white text-amber-600 rounded-md shadow-sm shadow-slate-800/40 border-transparent"
            />
        ),
    },
    {
        title: "Failed",
        value: 99,
        className: "",
        icon: (
            <FontAwesomeIcon
                icon={faCircleExclamation}
                className="h-4 w-5  p-3 bg-white text-pink-600 rounded-md shadow-sm shadow-slate-800/40 border-transparent"
            />
        ),
    },
];