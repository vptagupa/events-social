import Main from "../index";
import Form from "./form";
import { useForm } from "@/js/helpers/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { useState, useCallback, useMemo } from "react";
import { PrimaryButton } from "@/js/components/buttons";
import { dateFormat } from "@/js/components/calendar";
import moment from "moment";
import { fullDateTimeString } from "@/js/helpers";
import { Transition } from "@headlessui/react";
import { AlertSuccess } from "@/js/components/alerts";

export default function Edit({ event }) {
    const [processing, setProcessing] = useState(false);
    const { form } = useForm({
        method: "patch",
        route: route("organizer.events.update", {
            event: event.id,
            organizer: event.organizer.id,
        }),
        data: {
            title: event.title,
            slug: event.slug,
            description: event.description,
            place: event.place,
            address: event.address,
            map: event.map,
            start_at: event.expected_start_at,
            end_at: event.expected_end_at,
        },
    });

    const submit = (e) => {
        e.preventDefault();
        if (processing) return;

        form.submit({
            preseverScroll: true,
            preserveState: true,
            onBefore: () => setProcessing(true),
            onFinish: () => setProcessing(false),
        });
    };

    const handleChange = (key, value) => {
        if (["title"].includes(key)) {
            form.setData({
                ...form.data,
                slug: value
                    .replace(/[^a-zA-Z0-9\s]+/g, "")
                    .replace(/\s+/g, "-")
                    .toLowerCase(),
                [key]: value,
            });

            return;
        }
        form.setData(key, value);
    };

    const handleDateChange = useCallback((key, date) => {
        form.setData(
            key,
            date instanceof moment
                ? date.format(dateFormat)
                : fullDateTimeString(date)
        );
    }, []);

    const Action = useMemo(
        () => () =>
            (
                <div className="flex gap-x-2 items-center">
                    <Transition show={form.recentlySuccessful}>
                        <AlertSuccess className="!p-2 !text-xs">
                            Successfully save.
                        </AlertSuccess>
                    </Transition>
                    <div>
                        <PrimaryButton
                            processing={processing}
                            type="button"
                            className="flex items-center gap-x-1"
                            onClick={submit}
                        >
                            <FontAwesomeIcon icon={faFloppyDisk} /> Save
                        </PrimaryButton>
                    </div>
                </div>
            ),
        [form]
    );

    return (
        <Main event={event} action={<Action />}>
            <div className="w-full p-5">
                <Form
                    form={form}
                    handleDateChange={handleDateChange}
                    handleChange={handleChange}
                />
            </div>
        </Main>
    );
}
