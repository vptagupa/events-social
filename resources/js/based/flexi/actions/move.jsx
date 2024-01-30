import { faUpDownLeftRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Move(props) {
    return (
        <div {...props} className="w-1/2 p-1">
            <FontAwesomeIcon
                icon={faUpDownLeftRight}
                className="w-full cursor-move text-slate-500/60 hover:text-slate-500 hover:scale-150 transition-all duration-200"
            />
        </div>
    );
}
