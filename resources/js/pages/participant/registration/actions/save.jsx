import { PrimaryButton } from "@/js/components/buttons";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Save({ workshop }) {
    return (
        <PrimaryButton type="button" className="!px-2" title="Save">
            <FontAwesomeIcon icon={faFloppyDisk} className="h-7" />
        </PrimaryButton>
    );
}
