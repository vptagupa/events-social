import Form from "../components/form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { useEffect } from "react";
import Event from "@/js/helpers/event";
import FooterForm from "../components/form.footer";
import { useForm } from "@/js/helpers/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function Edit({ value, ...props }) {
    const { open, setOpen, form, closeForm } = useForm({
        method: "patch",
        route: route("admin.backend.organizers.update", {
            organizer: value.id,
        }),
        data: {
            id: value.id,
            name: value.name,
            email: value.email,
            role: value.role,
            nickname: value.nickname ?? "",
            default_checked_password: true,
        },
    });

    const submit = (e) => {
        form.submit({
            preseverScroll: true,
            preserveState: true,
            onSuccess: () => {
                Event.emit("reload");
                form.clearErrors();
                setTimeout(() => {
                    setOpen(false);
                }, 1000);
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
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="h-6 cursor-pointer text-pink-300 hover:text-pink-500 transition-all ease-in-out duration-100 hover:scale-125 absolute right-2 top-2"
                    title="Close Form"
                    onClick={(e) => closeForm()}
                />
                <Title>Update</Title>
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
