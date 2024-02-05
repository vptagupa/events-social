import { PrimarySwitch } from "@/js/components/switch";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Check({ url, value }) {
    const [checked, set] = useState(value);
    const [processing, setProcessing] = useState(false);

    return (
        <PrimarySwitch
            className={` ${processing ? "cursor-progress" : ""}`}
            handler={(checked) => {
                router.patch(
                    url,
                    {
                        checked,
                    },
                    {
                        preserveScroll: true,

                        onBefore: () => setProcessing(true),
                        onSuccess: () => set(checked),
                        onFinish: () => setProcessing(false),
                    }
                );
            }}
            checked={checked}
        />
    );
}
