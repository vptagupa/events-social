import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SuccessButton } from "@/js/components/buttons";

export default function Confirmed({ onClick }) {
    return (
        <SuccessButton
            type="button"
            className="flex items-center justify-center uppercase gap-x-1 font-bold !shadow-none"
            title="Confirmed"
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faCircleCheck} className="text-xl" />
            Confirm Full Payment
        </SuccessButton>
    );
}
