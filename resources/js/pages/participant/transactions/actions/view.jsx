import { Modal, Title } from "@/js/components/modal";
import { useState, useEffect, memo } from "react";
import Form from "../components/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default memo(function View({ value, open: _open, parentSetOpen }) {
    const [open, setOpen] = useState(_open);

    useEffect(() => {
        setOpen(_open);
    }, [_open]);

    return (
        <Modal
            open={open}
            className="w-[90%] md:w-3/5 !bg-purple-500 !text-slate-200"
        >
            <Title className="p-3 !border-b-purple-300 !text-lg">Payment</Title>
            <FontAwesomeIcon
                icon={faCircleXmark}
                className="h-6 cursor-pointer text-slate-200 hover:text-slate-400 transition-all ease-in-out duration-100 hover:scale-125 absolute right-2 top-2"
                title="Close Form"
                onClick={(e) => {
                    setOpen(false);
                    parentSetOpen(false);
                }}
            />
            <div className="flex items-center justify-center gap-3">
                <Form value={value} />
            </div>
        </Modal>
    );
});
