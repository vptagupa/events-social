import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryButton } from "@/js/components/buttons";

export default function PrintSelect({ event, value }) {
    return (
        <PrimaryButton
            type="button"
            className="!px-3"
            onClick={(e) => {
                window.open(
                    route("organizer.events.certificates.print-select", {
                        event: event.id,
                        ids: JSON.stringify(value),
                    })
                );
            }}
        >
            <FontAwesomeIcon icon={faPrint} className="text-lg" />
        </PrimaryButton>
    );
}
