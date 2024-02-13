import { SecondaryButton } from "@/js/components/buttons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MarkAsPaid({ workshop }) {
    return (
        <SecondaryButton type="button" className="!px-2" title="Mark as Paid">
            <FontAwesomeIcon icon={faCircleCheck} className="h-7" />
        </SecondaryButton>
    );
}
