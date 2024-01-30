import { faUpDownLeftRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Move(props) {
    return (
        <FontAwesomeIcon
            {...props}
            icon={faUpDownLeftRight}
            className="w-1/2 p-1 cursor-move text-slate-500/60 hover:text-slate-500 hover:scale-125 transform hover:rotate-180 transition-all duration-200"
        />
    );
}
