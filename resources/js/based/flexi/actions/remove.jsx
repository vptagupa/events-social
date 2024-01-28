import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Move({ click, ...props }) {
    return (
        <FontAwesomeIcon
            {...props}
            onClick={click}
            icon={faMinusCircle}
            className="w-1/2 p-1 cursor-pointer text-red-500/40 hover:text-red-500 hover:scale-125 transform hover:rotate-180 transition-all duration-200"
        />
    );
}
