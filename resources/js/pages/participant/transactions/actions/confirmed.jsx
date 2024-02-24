import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SuccessButton } from "@/js/components/buttons";
import View from "./view";
import { useState } from "react";

export default function Confirmed({ value, onClick, className }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <SuccessButton
                type="button"
                className="flex items-center justify-center uppercase gap-x-1 font-bold !shadow-none"
                title="Confirmed"
                onClick={(e) => (onClick ? onClick() : setOpen(true))}
            >
                <FontAwesomeIcon icon={faCircleCheck} />
                Confirm
            </SuccessButton>

            <View value={value} open={open} parentSetOpen={setOpen} />
        </>
    );
}
