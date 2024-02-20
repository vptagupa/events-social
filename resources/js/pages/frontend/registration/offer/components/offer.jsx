import { PrimaryButton, Button } from "@/js/components/buttons";
import { currency } from "@/js/helpers";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Offer({ value, workshop }) {
    const [processing, setProcessing] = useState(false);
    const select = () => {
        router.post(
            route("registration.offerSelect", {
                workshop: workshop.uuid,
                offer: value.id,
            }),
            {},
            {
                onBefore: () => setProcessing(true),
                onFinish: () => setProcessing(false),
            }
        );
    };

    return (
        <div className="w-full md:w-1/3 shadow-md border border-amber-200 box-border text-white/80 rounded-md p-2 bg-gradient-to-t from-[#BF3131] to-[#BF3131]">
            <div className="text-center font-bold text-2xl w-full p-4">
                {value.name}
            </div>
            <div className="text-start text-md w-full p-4">
                {value.description}
            </div>
            <div className="text-end text-md w-full p-4 underline">
                {currency(parseFloat(value.price))}
            </div>
            <div className="flex items-center justify-center text-md w-full p-4">
                <Button
                    processing={processing}
                    type="button"
                    className="bg-white text-black"
                    onClick={select}
                >
                    SELECT
                </Button>
            </div>
        </div>
    );
}
