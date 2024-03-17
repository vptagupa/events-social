import Scrollable from "@/js/components/scrollable";
import { Checkbox } from "@/js/components/form";
import { useState } from "react";
import { Modal, Title, Footer } from "@/js/components/modal";
import { PrimaryButton } from "@/js/components/buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function Contract({
    checked,
    title,
    content,
    onAgree,
    info,
    error,
    isRequired = false,
    className,
}) {
    const [open, setOpen] = useState(false);
    const [enabled, setEnabled] = useState(false);

    return (
        <div className="block p-1">
            <div className="flex items-center gap-x-2">
                <Checkbox
                    disabled={isRequired && !enabled && !checked}
                    checked={checked}
                    value={checked}
                    onChange={(e) => onAgree(e.target.checked)}
                    className="disabled:bg-slate-300 disabled:ring-slate-400"
                />
                <span
                    className={`text-blue-500 underline underline-offset-4 cursor-pointer 
                        ${className}
                    `}
                    onClick={(e) => setOpen(true)}
                >
                    {title}
                </span>
            </div>
            {isRequired && (
                <span className="block text-slate-800 bg-slate-200 p-1 text-xs my-2">
                    The checkbox will only be enabled once you scroll down to
                    the bottom of the terms. Please click the link above to read
                    the contents.
                </span>
            )}
            {error && (
                <span className="block text-danger text-xs">{error}</span>
            )}
            {info && <span className="block text-end text-xs">{info}</span>}
            <Modal open={open}>
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="h-6 cursor-pointer text-pink-300 hover:text-pink-500 transition-all ease-in-out duration-100 hover:scale-125 absolute right-2 top-2"
                    title="Close Form"
                    onClick={(e) => setOpen(false)}
                />
                <Title>{title}</Title>
                <Scrollable
                    value={content}
                    bottom={(value) => value && setEnabled(true)}
                />
                <Footer className="flex items-center justify-center">
                    <PrimaryButton
                        disabled={!enabled}
                        type="button"
                        className="disabled:bg-slate-600"
                        onClick={(e) => {
                            onAgree(true);
                            setOpen(false);
                        }}
                    >
                        Agree
                    </PrimaryButton>
                </Footer>
            </Modal>
        </div>
    );
}
