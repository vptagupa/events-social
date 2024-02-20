import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Move({ click, ...props }) {
    return (
        <FontAwesomeIcon
            {...props}
            onDoubleClick={click}
            icon={faMinusCircle}
            className="p-1 text-xl cursor-pointer text-red-500/40 hover:text-red-500 hover:scale-125 transform hover:rotate-180 transition-all duration-200"
        />
    );
}
