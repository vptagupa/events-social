import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function Name({ setFiles, value, event }) {
    const [selected, setSelected] = useState(
        value?.certificate?.workshop?.participant ?? ""
    );
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);

    const search = (query) => {
        const controller = new AbortController();
        axios
            .post(
                route("organizer.events.participants.list", {
                    event: event.id,
                }),
                {
                    query,
                    with: { "workshops.participant": true },
                },
                {
                    signal: controller.signal,
                }
            )
            .then((res) => {
                setData(res.data.data);
            });
    };

    useEffect(() => {
        if (value && selected) {
            if (selected?.workshops) {
                value.workshop = selected.id;
                value.name = selected.workshops[0].participant.name;
            } else {
                value.name = selected?.name ?? "";
            }

            setFiles((files) => [...files]);
        }
    }, [selected]);

    useEffect(() => {
        search(query);
    }, [query]);

    useEffect(() => {
        if (value) {
            setSelected(value);
        }
    }, [value]);

    return (
        <Combobox
            value={selected}
            onChange={(value) => setSelected(selected == value ? null : value)}
        >
            <div className="relative mt-1 z-50">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md shadow-slate-200 ring-1 ring-slate-300 focus:ring-purple-300 focus-visible:ring-purple-300 sm:text-sm">
                    <Combobox.Input
                        className="w-full border-none py-2 pl-3 pr-10 focus:outline-none text-sm leading-5 text-gray-900 focus:ring-0"
                        displayValue={(selected) => selected?.name ?? query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {query.length > 0 && (
                            <Combobox.Option
                                value={{ id: null, name: query }}
                                className={({ active }) =>
                                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                        active
                                            ? "bg-primary text-white"
                                            : "text-gray-900"
                                    }`
                                }
                            >
                                Create "{query}"
                            </Combobox.Option>
                        )}
                        {data.map((data) => (
                            <Combobox.Option
                                key={data.id}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                            ? "bg-primary text-white"
                                            : "text-gray-900"
                                    }`
                                }
                                value={data}
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={`block truncate ${
                                                selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                            }`}
                                        >
                                            {data.name}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                    active
                                                        ? "text-white"
                                                        : "text-teal-600"
                                                }`}
                                            >
                                                <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
}
