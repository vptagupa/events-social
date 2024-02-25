import { Modal, Title } from "@/js/components/modal";
import { useState, useEffect, memo } from "react";
import Confirm from "../components/confirm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default memo(function View({ value, open: _open, parentSetOpen }) {
    const [open, setOpen] = useState(_open);

    useEffect(() => {
        setOpen(_open);
    }, [_open]);

    return (
        <Modal open={open} className="w-[90%] md:w-3/5">
            <FontAwesomeIcon
                icon={faCircleXmark}
                className="h-6 z-[99999] cursor-pointer text-slate-200 hover:text-slate-200 transition-all ease-in-out duration-100 hover:scale-125 absolute right-2 top-2"
                title="Close Form"
                onClick={(e) => {
                    setOpen(false);
                    parentSetOpen(false);
                }}
            />

            <Confirm value={value} />
        </Modal>
    );
});
