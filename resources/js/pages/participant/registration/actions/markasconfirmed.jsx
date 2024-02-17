import { SecondaryButton } from "@/js/components/buttons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function MarkAsConfirmed({ workshop }) {
    const [processing, setProcessing] = useState(false);

    return (
        <SecondaryButton
            disabled={workshop.is_confirmed}
            processing={processing}
            type="button"
            className="!px-2 disabled:bg-blue-300"
            title={workshop.is_confirmed ? "Confirmed" : `Mark as Confirmed`}
            onClick={(e) => {
                router.patch(
                    route("organizer.participant.confirmed", workshop.id),
                    {},
                    {
                        onBefore: () => setProcessing(true),
                        onFinish: () => setProcessing(false),
                    }
                );
            }}
        >
            <FontAwesomeIcon icon={faCircleCheck} className="h-7" />
        </SecondaryButton>
    );
}
