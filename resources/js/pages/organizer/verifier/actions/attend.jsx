import { Button } from "@/js/components/buttons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Attend({ value, onChange }) {
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    return (
        <Button
            processing={processing}
            onClick={(e) => {
                router.post(
                    route("organizer.events.participants.verifier.store", {
                        event: value.event_id,
                        workshop: value.id,
                    }),
                    {},
                    {
                        onBefore: () => setProcessing(true),
                        onSuccess: () => {
                            setSuccess(true);
                            setTimeout(() => {
                                onChange(null);
                                setSuccess(false);
                            }, 1000);
                        },
                        onFinish: () => setProcessing(false),
                    }
                );
            }}
            type="button"
            className={`${
                success
                    ? "from-green-200 to-teal-300"
                    : "from-green-300 to-teal-400"
            } !outline-2 !outline-slate-200 hover:!outline-green-500 !shadow-none bg-gradient-to-b  hover:from-green-500 hover:to-teal-600 transition-all ease-in-out delay-150 duration-300 text-white`}
        >
            <FontAwesomeIcon
                icon={faCheck}
                className={`text-4xl ${success ? "text-green-500" : ""}`}
            />
        </Button>
    );
}
