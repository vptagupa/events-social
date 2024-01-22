import Form from "../components/form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { useEffect } from "react";
import Event from "@/js/helpers/event";
import FooterForm from "../components/form.footer";
import { useForm } from "@/js/helpers/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Close from "../components/close";

export default function Edit({ value, ...props }) {
    const { open, setOpen, form, closeForm } = useForm({
        method: "patch",
        route: route("organizer.events.update", {
            event: value.id,
        }),
        data: {
            organizer_id: value.organizer.id,
            title: value.title,
            description: value.description,
            start_at: value.expected_start_at,
            end_at: value.expected_end_at,
        },
    });

    const submit = (e) => {
        form.submit({
            preseverScroll: true,
            preserveState: false,
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
                title="Edit"
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
}
