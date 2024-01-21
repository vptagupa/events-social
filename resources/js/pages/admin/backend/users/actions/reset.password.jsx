import { Confirm } from "@/js/components/modal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { router } from "@inertiajs/react";

export default function Reset({ id }) {
    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleReset = async () => {
        router.patch(
            route("admin.backend.users.reset-password", {
                admin: id,
            }),
            {},
            {
                onBefore: () => setProcessing(true),
                onFinish: () => {
                    setProcessing(false);
                    setOpen(false);
                },
            }
        );
    };
    return (
        <>
            <div
                title="Reset Password"
                className="cursor-pointer"
                onClick={(e) => setOpen(true)}
            >
                <FontAwesomeIcon
                    icon={faUnlock}
                    className="h-5 text-purple-300 hover:text-purple-600 hover:scale-105 transition-all duration-100"
                />
            </div>
            <Confirm
                open={open}
                title="Reset"
                description="Are you sure you want to reset password?"
                yes={(e) => handleReset()}
                no={(e) => setOpen(false)}
                processing={processing}
            />
        </>
    );
}
