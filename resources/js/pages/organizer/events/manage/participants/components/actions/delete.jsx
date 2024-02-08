import { Confirm } from "@/js/components/modal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { router } from "@inertiajs/react";
import Event from "@/js/helpers/event";
import { memo } from "react";

export default memo(function Delete({ value }) {
    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleDelete = () => {
        router.delete(
            route("organizer.events.participants.destroy", {
                event: value.workshops[0].event_id,
                participant: value.id,
            }),
            {
                onBefore: () => setProcessing(true),
                onFinish: () => {
                    setProcessing(false);
                    setOpen(false);
                    Event.emit("reload");
                },
            }
        );
    };

    return (
        <>
            <div
                title="Remove"
                className="cursor-pointer flex items-center justify-start gap-x-2 "
                onClick={(e) => setOpen(true)}
            >
                <FontAwesomeIcon
                    icon={faCircleMinus}
                    className="h-5 text-primary hover-pointer group-hover:text-slate-200"
                />
                Delete
            </div>

            <Confirm
                open={open}
                title="Delete"
                description="Are you sure you want to delete?"
                processing={processing}
                yes={(e) => handleDelete()}
                no={(e) => setOpen(false)}
            />
        </>
    );
});
