import Form from "@/js/pages/organizer/events/components/form";
import { Modal, Title, Footer } from "@/js/components/modal";
import FooterForm from "../components/form.footer";
import { useForm } from "@/js/helpers/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { dateFormat } from "@/js/components/calendar";

export default function NewEvent({ organizer }) {
    const { open, setOpen, form, closeForm } = useForm({
        method: "post",
        route: route("organizer.events.store"),
        data: {
            organizer_id: organizer.id,
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
            onSuccess: () => closeForm(),
        });
    };

    return (
        <>
            <div
                className="cursor-pointer"
                title="Add New Event"
                onClick={(e) => setOpen(true)}
            >
                <FontAwesomeIcon
                    icon={faCalendar}
                    className="h-5 text-amber-300 hover:text-amber-600 hover:scale-105 transition-all duration-100"
                />
            </div>
            <Modal open={open}>
                <Title>Add New Event of {organizer.name}</Title>
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
