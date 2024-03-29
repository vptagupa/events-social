import { Confirm } from "@/js/components/modal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { router } from "@inertiajs/react";
import Event from "@/js/helpers/event";

export default function Delete({ url }) {
    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleDelete = () => {
        router.delete(url, {
            onBefore: () => setProcessing(true),
            onFinish: () => {
                setProcessing(false);
                setOpen(false);
                Event.emit("reload");
            },
        });
    };

    return (
        <>
            <div
                title="Remove"
                className="cursor-pointer"
                onClick={(e) => setOpen(true)}
            >
                <FontAwesomeIcon
                    icon={faCircleMinus}
                    className="h-5 text-pink-300 hover:text-pink-600 hover:scale-105 transition-all duration-100"
                />
            </div>
            <Confirm
                open={open}
                title="Delete"
                description="Are you sure you want to delete?"
                processing={processing}
                yes={() => handleDelete()}
                no={(e) => setOpen(false)}
            />
        </>
    );
}
