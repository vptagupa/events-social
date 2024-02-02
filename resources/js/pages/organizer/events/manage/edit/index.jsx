import Main from "../index";
import Form from "./form";
import { useForm } from "@/js/helpers/form";

export default function Edit({ event }) {
    const { form } = useForm({
        method: "patch",
        route: route("organizer.events.update", {
            event: event.id,
        }),
        data: {
            organizer_id: event.organizer.id,
            title: event.title,
            description: event.description,
            start_at: event.expected_start_at,
            end_at: event.expected_end_at,
        },
    });

    const submit = (e) => {
        e.preventDefault();
        form.submit({
            preseverScroll: true,
            preserveState: false,
        });
    };

    return (
        <Main event={event}>
            <div className="w-full p-5">
                <Form form={form} submit={submit} />
            </div>
        </Main>
    );
}
