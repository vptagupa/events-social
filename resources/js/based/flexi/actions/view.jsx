import {
    faExpand,
    faCircleXmark,
    faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Title, Footer } from "@/js/components/modal";
import { useState } from "react";
import Column from "../components/column";

export default function View({ click, title, caption, ...props }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <FontAwesomeIcon
                title={title}
                onClick={() => setOpen(true)}
                icon={faUpRightAndDownLeftFromCenter}
                className="text-xl p-1 cursor-pointer font-bold text-purple-500/40 hover:text-purple-500 hover:scale-125 transform hover:rotate-180 transition-all duration-200"
            />
            <Modal open={open} className="xs:w-[90%] md:w-1/2 p-3">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="h-6 cursor-pointer text-pink-300 hover:text-pink-500 transition-all ease-in-out duration-100 hover:scale-125 absolute right-2 top-2"
                    title="Close Form"
                    onClick={(e) => setOpen(false)}
                />
                <Title>{caption}</Title>
                <Column
                    view={false}
                    idx={props.idx}
                    column={props.column}
                    flex={props.flex}
                    grid={props.grid}
                    flexia={props.flexia}
                />
            </Modal>
        </>
    );
}
