import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Config({ click, active }) {
    return (
        <FontAwesomeIcon
            onClick={click}
            icon={faWrench}
            className={`text-xl p-1 cursor-pointer hover:text-slate-500 transform  hover:scale-125 transition-all duration-200
                ${
                    active
                        ? "rotate-180 text-slate-500 scale-125 hover:rotate-0"
                        : "text-slate-500/60 scale-100 hover:rotate-180"
                }
            `}
        />
    );
}
