import { Checkbox } from "@/js/components/form";
import { useState } from "react";
import { router } from "@inertiajs/react";

export default function Activate({ id, active = false }) {
    const [processing, setProcessing] = useState(false);
    const [_active, setActive] = useState(active);
    const handleClick = async (checked) => {
        router.patch(
            route("organizer.events.activate", {
                event: id,
            }),
            {},
            {
                onBefore: () => setProcessing(true),
                onSuccess: () => setActive(checked),
                onFinish: () => setProcessing(false),
            }
        );
    };
    return (
        <>
            <div
                title={`${_active ? "Deactivate" : "Activate"}`}
                className="cursor-pointer flex items-center"
            >
                <Checkbox
                    className={`cursor-pointer h-5 w-5 bg-blue-300 ring-0 hover:scale-105 transition-all duration-100
                    ${
                        _active
                            ? "checked:bg-blue-500/80 checked:hover:bg-blue-600 checked:ring-0"
                            : ""
                    }
                    ${processing ? "animate-bounce" : ""}`}
                    value={_active}
                    checked={_active}
                    onChange={(e) => handleClick(e.target.checked)}
                />
            </div>
        </>
    );
}
