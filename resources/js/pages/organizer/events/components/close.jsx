import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function Close({ click }) {
    return (
        <FontAwesomeIcon
            icon={faCircleXmark}
            className="h-6 cursor-pointer text-pink-300 hover:text-pink-500 transition-all ease-in-out duration-100 hover:scale-125 absolute right-2 top-2"
            title="Close Form"
            onClick={click}
        />
    );
}
