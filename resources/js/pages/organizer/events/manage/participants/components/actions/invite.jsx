import { Form, Input } from "@/js/components/form";
import { Button } from "@/js/components/buttons";
import { useForm } from "@/js/helpers/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Event from "@/js/helpers/event";
import { memo, useState } from "react";

export default memo(function Invite({ event }) {
    const [success, setSuccess] = useState(null);
    const { form } = useForm({
        method: "post",
        route: route("organizer.events.participants.invite", event.id),
        data: {
            email: "",
        },
    });

    const submit = (e) => {
        e.preventDefault();
        if (form.processing) return;

        form.submit({
            preseverScroll: true,
            preserveState: true,
            onSuccess: () => Event.emit("reload"),
        });
    };

    return (
        <Form
            className="flex flex-col justify-center w-full md:w-2/3"
            onSubmit={submit}
        >
            {form.invalid("email") && (
                <div className="text-danger text-xs relative">
                    <span className="absolute -top-4">{form.errors.email}</span>
                </div>
            )}
            <div className="flex items-center w-full">
                <Input
                    type="text"
                    placeholder="Type email address to invite"
                    className="border-r-0 rounded-r-none lg:w-96"
                    onChange={(e) => form.setData("email", e.target.value)}
                />
                <Button
                    title="Send invite"
                    onClick={submit}
                    className="shadow-none border border-slate-300 rounded-l-none"
                >
                    <FontAwesomeIcon
                        icon={faPaperPlane}
                        className={`h-5 ${
                            form.processing
                                ? "animate-bounce text-amber-300"
                                : form.recentlySuccessful
                                ? "text-success"
                                : form.hasErrors
                                ? "text-danger"
                                : ""
                        }`}
                    />
                </Button>
            </div>
        </Form>
    );
});
