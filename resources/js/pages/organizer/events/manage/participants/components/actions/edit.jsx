import Form from "../form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { Button } from "@/js/components/buttons";
import Event from "@/js/helpers/event";
import FooterForm from "../form/footer";
import { useForm } from "@/js/helpers/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import Close from "../close";
import { memo } from "react";

export default memo(function Edit({ value }) {
    const { open, setOpen, form, closeForm } = useForm({
        method: "patch",
        route: route("organizer.events.participants.update", {
            participant: value.id,
            event: value.workshops[0].event_id,
        }),
        data: {
            name: value.name,
            email: value.email,
        },
    });

    const submit = (e) => {
        if (form.processing) return;

        form.submit({
            preseverScroll: true,
            preserveState: true,
            onSuccess: () => {
                Event.emit("reload");
                closeForm();
            },
        });
    };

    return (
        <>
            <div
                className="cursor-pointer"
                title="Basic Edit"
                onClick={(e) => setOpen(true)}
            >
                <FontAwesomeIcon
                    icon={faPenNib}
                    className="h-5 text-green-300 hover:text-green-600 hover:scale-105 transition-all duration-100"
                />
            </div>

            <Modal open={open}>
                <Close click={(e) => setOpen(false)} />
                <Title>Update</Title>
                <Form form={form} />
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
