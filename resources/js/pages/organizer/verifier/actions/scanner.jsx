import { Scanner as Scan } from "@yudiel/react-qr-scanner";
import { Button } from "@/js/components/buttons";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { Transition } from "@headlessui/react";

export default function Scanner({
    event,
    value,
    onChange,
    isOpen = false,
    onChangeState,
}) {
    const [open, setOpen] = useState(isOpen);
    const [error, setError] = useState(null);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        onChangeState(open);
    }, [open]);

    return (
        <>
            {!open ? (
                <Button
                    type="button"
                    className={`!text-6xl !shadow-none bg-slate-500 hover:!bg-slate-600 uppercase`}
                    onClick={(e) => setOpen(true)}
                >
                    Scan
                </Button>
            ) : (
                <div className="flex justify-end w-full">
                    <Button
                        type="button"
                        className={`!text-6x !shadow-none bg-slate-500 hover:!bg-slate-600 uppercase`}
                        onClick={(e) => setOpen(false)}
                    >
                        <FontAwesomeIcon icon={faReply} className="text-3xl" />
                    </Button>
                </div>
            )}

            {open && !value && (
                <Scan
                    styles={{
                        container: error && {
                            backgroundColor: "#ec4899",
                            border: "4px solid #ec4899",
                            width: "100%",
                            height: "100%",
                        },
                        video: error && {
                            backgroundColor: "#ec4899",
                            border: "4px solid #ec4899",
                            width: "100%",
                            height: "100%",
                        },
                    }}
                    onResult={(result) => {
                        axios
                            .post(
                                route(
                                    "organizer.events.participants.verifier.verify",
                                    {
                                        event: event.id,
                                        workshop: result,
                                    }
                                )
                            )
                            .then((res) => {
                                if (res?.data) {
                                    onChange(res.data);
                                }
                                setError(null);
                            })
                            .catch((error) => setError(error));
                    }}
                    onError={(error) => setError(error)}
                />
            )}
        </>
    );
}
