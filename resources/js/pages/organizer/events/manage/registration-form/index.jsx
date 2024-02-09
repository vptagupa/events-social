import Flexi from "@/js/based/flexi";
import Main from "../index";
import { PrimaryButton, SecondaryButton } from "@/js/components/buttons";
import { flexs } from "@/js/based/flexi/constants";
import { useFlexi } from "@/js/based/flexi/flexi";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { Transition } from "@headlessui/react";

export default function RegistrationForm({ event }) {
    const flexia = useFlexi(event.registration_form?.schema);
    const [processing, setProcessing] = useState({
        regular: false,
        published: false,
    });

    useEffect(() => {
        flexia.update(event.registration_form?.schema || flexs);
    }, [event.registration_form?.schema]);

    const controller = new AbortController();
    const save = async (published = false) => {
        setProcessing({
            regular: !published,
            published,
        });
        try {
            await axios.post(
                route("organizer.events.registration-form.store", event.id),
                {
                    schema: flexia.data,
                    published: published,
                },
                { signal: controller.signal }
            );
        } catch (error) {
        } finally {
            setProcessing({
                regular: false,
                published: false,
            });
        }
    };

    useEffect(() => {
        // Auto save to database when change
        // save();

        return () => {
            controller.abort();
        };
    }, [flexia.data]);

    const Action = () => (
        <div className="flex gap-x-2 items-center">
            <Transition
                show={processing.regular || processing.published}
                className="text-xs"
            >
                Successfully save.
            </Transition>
            <div>
                <PrimaryButton
                    processing={processing.regular}
                    type="button"
                    className="flex items-center gap-x-1"
                    onClick={(e) => save(false)}
                >
                    <FontAwesomeIcon icon={faFloppyDisk} /> Save
                </PrimaryButton>
            </div>
            <div>
                <SecondaryButton
                    processing={processing.published}
                    type="button"
                    className="flex items-center gap-x-1"
                    onClick={(e) =>
                        save(!event.registration_form?.is_published)
                    }
                >
                    <FontAwesomeIcon icon={faFloppyDisk} />{" "}
                    {event.registration_form?.is_published ? "Draft" : "Live"}
                </SecondaryButton>
            </div>
        </div>
    );

    return (
        <Main event={event} action={<Action />}>
            <div className="flex items-start justify-start min-h-[32rem]">
                <Flexi flexia={flexia} />
            </div>
        </Main>
    );
}
