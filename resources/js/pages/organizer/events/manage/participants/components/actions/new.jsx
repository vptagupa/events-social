import Form from "../form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { Button } from "@/js/components/buttons";
import Event from "@/js/helpers/event";
import FooterForm from "../form/footer";
import { useForm } from "@/js/helpers/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Close from "../close";
import { memo } from "react";

export default memo(function New({ event }) {
    const { open, setOpen, form, closeForm } = useForm({
        method: "post",
        route: route("organizer.events.participants.store", event.id),
        data: {
            name: "",
            email: "",
            default_checked_password: true,
            password: "",
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
            <Button
                onClick={(e) => setOpen(true)}
                className="space-x-1 bg-none shadow-none text-purple-500 font-bold btn-sm"
            >
                <FontAwesomeIcon icon={faPlus} className="h-4" />
                <span>Add New</span>
            </Button>
            <Modal open={open}>
                <Close click={(e) => setOpen(false)} />
                <Title>Add New</Title>
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
