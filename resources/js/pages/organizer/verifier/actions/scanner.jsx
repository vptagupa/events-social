import { Scanner as Scan } from "@yudiel/react-qr-scanner";
import { Button } from "@/js/components/buttons";
import { useState, useEffect } from "react";
import axios from "axios";

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
            <Button
                type="button"
                className="!text-6xl !shadow-none bg-slate-500 hover:!bg-slate-600 uppercase"
                onClick={(e) => setOpen(!open)}
            >
                {open ? "Stop" : "Scan"}
            </Button>
            {open && !value && (
                <Scan
                    styles={{
                        container: error && {
                            backgroundColor: "#ec4899",
                            border: "2px solid #ec4899",
                        },
                        video: error && {
                            backgroundColor: "#ec4899",
                            border: "2px solid #ec4899",
                        },
                    }}
                    onResult={(result) => {
                        axios
                            .post(
                                route(
                                    "organizer.events.participants.verifier.verify",
                                    {
                                        event: event.id,
                                        workshop:
                                            "9b7bc635-736e-4e95-8269-778ecc4b07a5",
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
