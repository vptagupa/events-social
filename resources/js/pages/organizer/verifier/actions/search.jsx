import { Button } from "@/js/components/buttons";
import SearchParticipants from "../components/search";
import { useState, useEffect } from "react";

export default function Search({
    event,
    value,
    onChange,
    isOpen = false,
    onChangeState,
}) {
    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        onChangeState(open);
    }, [open]);

    return (
        <>
            {open && !value && (
                <div className="w-full h-[200px] flex items-center justify-center">
                    <SearchParticipants event={event} onChange={onChange} />
                </div>
            )}
            {!open && (
                <Button
                    onClick={(e) => setOpen(!open)}
                    type="button"
                    className="text-2xl md:!text-6xl !shadow-none bg-slate-500 hover:!bg-slate-600 uppercase"
                >
                    {open ? "Close Search Box" : "Search"}
                </Button>
            )}
        </>
    );
}
