import { faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Partial({ onClick, className }) {
    return (
        <>
            <div
                className="flex items-center justify-start gap-x-1 cursor-pointer"
                onClick={onClick}
            >
                <FontAwesomeIcon
                    icon={faSquarePollVertical}
                    title="Partial"
                    className={`cursor-pointer text-primary group-hover:text-slate-200 ${className}`}
                />
                Partial
            </div>
        </>
    );
}
