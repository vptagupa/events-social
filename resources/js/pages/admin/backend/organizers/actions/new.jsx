import Form from "../components/form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { Button } from "@/js/components/buttons";
import { useEffect } from "react";
import Event from "@/js/helpers/event";
import FooterForm from "../components/form.footer";
import { useForm } from "@/js/helpers/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function New(props) {
    const { open, setOpen, form, closeForm } = useForm({
        method: "post",
        route: route("admin.backend.organizers.store"),
        data: {
            name: "",
            email: "",
            role: "",
            password: "",
            nickname: "",
            default_checked_password: true,
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
                <Title>Add New</Title>
                <Form form={form} roles={props.roles} />
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
}
