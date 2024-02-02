import Form from "../components/form";
import { Modal, Title, Footer } from "@/js/components/modal";
import FooterForm from "../components/form.footer";
import { useForm } from "@/js/helpers/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Event from "@/js/helpers/event";

export default function Edit({ value, url, ...props }) {
    const { open, setOpen, form, closeForm } = useForm({
        method: "patch",
        route: url,
        data: {
            id: value.id,
            name: value.name,
            price: value.price,
            active: value.active,
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