import { PrimaryButton } from "@/js/components/buttons";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ControlContext } from "../context";
import { useState, useContext, useEffect } from "react";
import { router } from "@inertiajs/react";

export default function Save({ workshop }) {
    const context = useContext(ControlContext);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (success !== null) {
            setTimeout(() => {
                setSuccess(null);
            }, 3000);
        }
    }, [success]);

    return (
        <PrimaryButton
            processing={processing}
            type="button"
            className={`!px-2`}
            title="Save"
            onClick={(e) => {
                let error = false;
                for (let form of context.control.data) {
                    if (!context.control.validateForm(form)) {
                        error = true;
                    }
                }
                if (error) return;

                router.post(
                    route("organizer.participant.update", workshop.id),
                    {
                        flexis: context.control.data,
                        note: context.control.other.note,
                    },
                    {
                        onBefore: () => setProcessing(true),
                        onSuccess: () => setSuccess(true),
                        onError: () => setSuccess(false),
                        onFinish: () => setProcessing(false),
                    }
                );
            }}
        >
            <FontAwesomeIcon
                icon={faFloppyDisk}
                className={`h-7 ${
                    success != null
                        ? (success ? "text-green-300" : "text-red-300") +
                          " animate-pulse"
                        : ""
                }`}
            />
        </PrimaryButton>
    );
}
