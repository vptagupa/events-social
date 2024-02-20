import { Modal, Title, Footer } from "@/js/components/modal";
import { PrimaryButton } from "@/js/components/buttons";

import { memo, useState, useEffect } from "react";
import { dateDisplay } from "@/js/helpers";

import Close from "../close";

export default memo(function ExportView({ value, setView }) {
    const [open, setOpen] = useState(false);

    const Row = ({ name, value }) => (
        <div className="flex items-center gap-y-2 border-b border-slate-300 last:border-b-0">
            <div className="font-bold w-[30%]">{name}:</div>
            <div className="w-[70%]">{value}</div>
        </div>
    );

    useEffect(() => {
        if (value) {
            setOpen(true);
        }
    }, [value]);

    if (!value) return;

    return (
        <>
            <Modal open={open}>
                <Close
                    click={(e) => {
                        setOpen(false);
                        setView(null);
                    }}
                />
                <Title>Export Info</Title>
                <div className="flex flex-col gap-y-2">
                    <Row name={"Date"} value={dateDisplay(value.created_at)} />
                    <Row
                        name={"Export Type"}
                        value={value.criteria?.type ?? "None"}
                    />
                    <Row name={"Filename"} value={value.filename} />
                    {(value.criteria?.filter ?? []).map((filter, idx) => (
                        <Row
                            key={idx}
                            name={filter.name}
                            value={filter?.value ?? ""}
                        />
                    ))}
                </div>
                <Footer>
                    <div className="flex justify-end items-center">
                        <div className="flex space-x-2 items-center">
                            <PrimaryButton
                                type="button"
                                onClick={(e) =>
                                    window.open(value.url, "_blank")
                                }
                            >
                                Download
                            </PrimaryButton>
                        </div>
                    </div>
                </Footer>
            </Modal>
        </>
    );
});
