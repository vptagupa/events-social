import Flexi from "@/js/based/flexi";
import Main from "../index";
import { PrimaryButton } from "@/js/components/buttons";
import { flexs } from "@/js/based/flexi/constants";
import { useFlexi } from "@/js/based/flexi/flexi";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { Transition } from "@headlessui/react";

export default function RegistrationForm({ event }) {
    const flexia = useFlexi(event.registration_form?.schema);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        flexia.update(event.registration_form?.schema || flexs);
    }, [event.registration_form?.schema]);

    const controller = new AbortController();
    const save = async () => {
        setProcessing(true);
        await axios.post(
            route("organizer.events.registration-form.store", event.id),
            {
                schema: flexia.data,
            },
            { signal: controller.signal }
        );
        setProcessing(false);
    };

    useEffect(() => {
        // Auto save to database when change
        save();

        return () => {
            controller.abort();
        };
    }, [flexia.data]);

    const Action = () => (
        <div className="flex gap-x-2 items-center">
            <Transition show={processing} className="text-xs">
                Successfully save.
            </Transition>
            <div>
                <PrimaryButton
                    processing={processing}
                    type="button"
                    className="flex items-center gap-x-1"
                    onClick={save}
                >
                    <FontAwesomeIcon icon={faFloppyDisk} /> Save
                </PrimaryButton>
            </div>
        </div>
    );

    return (
        <Main event={event} action={<Action />}>
            <div className="flex items-start justify-center min-h-[32rem]">
                <Flexi flexia={flexia} />
            </div>
        </Main>
    );
}
