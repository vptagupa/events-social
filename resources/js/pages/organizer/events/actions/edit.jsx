import Form from "../components/form";
import { Modal, Title, Footer } from "@/js/components/modal";
import Event from "@/js/helpers/event";
import FooterForm from "../components/form/form.footer";
import { useForm } from "@/js/helpers/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import Close from "../components/close";
import { memo } from "react";

export default memo(function Edit({ value, url }) {
    const { open, setOpen, form, closeForm } = useForm({
        method: "patch",
        route: url,
        data: {
            title: value.title,
            description: value.description,
            place: value.place,
            address: value.address,
            map: value.map,
            start_at: value.expected_start_at,
            end_at: value.expected_end_at,
        },
    });

    const submit = (e) => {
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
