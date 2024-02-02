import Form from "../components/form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { Button } from "@/js/components/buttons";
import Event from "@/js/helpers/event";
import FooterForm from "../components/form/form.footer";
import { useForm } from "@/js/helpers/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Close from "../components/close";
import moment from "moment";
import { dateFormat } from "@/js/components/calendar";
import { memo } from "react";

export default memo(function New({ url }) {
    const { open, setOpen, form, closeForm } = useForm({
        method: "post",
        route: url,
        data: {
            title: "",
            description: "",
            start_at: moment(new Date(), dateFormat).format(dateFormat),
            end_at: moment(new Date(), dateFormat).format(dateFormat),
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
