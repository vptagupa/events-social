import { DangerButton } from "@/js/components/buttons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MarkAsCancellled({ workshop }) {
    return (
        <DangerButton type="button" className="!px-2" title="Mark as Cancelled">
            <FontAwesomeIcon icon={faCircleXmark} className="h-7" />
        </DangerButton>
    );
}
