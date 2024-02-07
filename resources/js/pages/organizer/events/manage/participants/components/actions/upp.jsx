import UppForm from "../form/upp";
import { Modal, Title, Footer } from "@/js/components/modal";
import Event from "@/js/helpers/event";
import FooterForm from "../form/footer";
import { useForm } from "@/js/helpers/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import Close from "../close";
import { memo, useRef } from "react";

export default memo(function Upp({ value }) {
    const file = useRef();
    const { open, setOpen, form, closeForm } = useForm({
        method: "post",
        route: route("organizer.events.participants.upp", {
            participant: value.id,
            event: value.workshops[0].event_id,
        }),
        data: {
            file: value.file,
        },
    });

    const submit = (e) => {
        if (form.processing) return;

        form.submit({
            preseverScroll: true,
            preserveState: true,
            forceFormData: true,
            onSuccess: () => {
                Event.emit("reload");
                closeForm();
            },
        });
    };

    const handleRemove = () => {
        form.setData("file", null);
    };

    return (
        <>
            <div
                className="cursor-pointer"
                title="Upload Proof of Payment"
                onClick={(e) => setOpen(true)}
            >
                <FontAwesomeIcon
                    icon={faFileArrowUp}
                    className="h-5 text-amber-300 hover:text-amber-600 hover:scale-105 transition-all duration-100"
                />
            </div>

            <Modal open={open}>
                <Close click={(e) => setOpen(false)} />
                <Title>
                    Upload Proof of Payment for{" "}
                    {value?.name ?? "code " + value.workshops[0].code}
                </Title>
                <UppForm form={form} file={file} handleRemove={handleRemove} />
                <Footer>
                    <FooterForm
                        form={form}
                        closeForm={closeForm}
                        submit={submit}
                    />
                </Footer>
            </Modal>
        </>
    );
});
