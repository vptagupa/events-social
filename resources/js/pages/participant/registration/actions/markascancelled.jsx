import { DangerButton } from "@/js/components/buttons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function MarkAsCancellled({ workshop }) {
    const [processing, setProcessing] = useState(false);

    return (
        <DangerButton
            processing={processing}
            disabled={workshop.is_cancelled}
            type="button"
            className="!px-2 disabled:bg-red-200"
            title={workshop.is_cancelled ? "Cancelled" : `Mark as Cancelled`}
            onClick={(e) => {
                router.patch(
                    route("organizer.participant.cancelled", workshop.id),
                    {},
                    {
                        onBefore: () => setProcessing(true),
                        onFinish: () => setProcessing(false),
                    }
                );
            }}
        >
            <FontAwesomeIcon icon={faCircleXmark} className="h-7" />
        </DangerButton>
    );
}
