import Attributes from "./components/attributes";
import Flex from "./components/flex";
import { useFlexi } from "./flexi";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { flexs } from "./constants";

export default function Flexi({ event }) {
    const flexia = useFlexi(event.registration_form?.schema);
    const [processing, setProcessing] = useState(false);
    console.log(flexia);
    useEffect(() => {
        flexia.update(event.registration_form?.schema || flexs);
    }, [event.registration_form?.schema]);

    useEffect(() => {
        // Auto save to database when change
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

        save();

        return () => {
            controller.abort();
        };
    }, [flexia.data]);

    return (
        <div className="flex grow min-h-[30rem] text-xs md:text-sm">
            <div className="w-[80%] m-2 flex flex-col gap-y-2">
                <div className="flex items-center justify-between">
                    <div>
                        {processing && (
                            <span className="flex item-center justify-center text-xs gap-x-2">
                                <FontAwesomeIcon
                                    className="h-4 animate-spin"
                                    icon={faSpinner}
                                />
                                Saving...
                            </span>
                        )}
                    </div>
                    <ol>
                        {flexia.data.flexis.map((flex) => (
                            <li
                                key={flex.flex}
                                className={`float-left px-3 py-1 m-1 cursor-pointer last:border-r-0 border-r border-slate-200
                                hover:bg-slate-200
                                ${flex.active ? "bg-slate-200" : ""}`}
                                onClick={(e) => flexia.flexToggleShow(flex)}
                            >
                                {flex.config.name}
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="relative">
                    {flexia.data.flexis.map((flex) => (
                        <Transition
                            key={flex.flex}
                            show={flex.active}
                            className="absolute w-full"
                            enter="transition-opacity duration-75"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Flex flex={flex} flexia={flexia} />
                        </Transition>
                    ))}
                </div>
            </div>
            <div className="w-[20%] flex flex-col gap-y-2 min-h-[10rem] box-border border-l border-slate-300 p-2">
                <Attributes {...flexia} />
            </div>
        </div>
    );
}