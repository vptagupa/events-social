import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { usePage } from "@inertiajs/react";

export default function Statuses({ setSearch }) {
    const { statuses } = usePage().props;
    const [data, setData] = useState(statuses);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        setSearch((search) => ({
            ...search,
            statuses: selected.map((d) => d.id),
        }));
    }, [selected]);

    return (
        <Listbox value={selected} onChange={setSelected} multiple>
            <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md shadow-slate-200 ring-1 ring-slate-300 focus:ring-purple-300 focus-visible:ring-purple-300 sm:text-sm">
                    <span className="block truncate">
                        {selected.length > 0
                            ? selected.map((status) => status.name).join(", ")
                            : "Status"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-100 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {data.map((status, idx) => (
                            <Listbox.Option
                                key={idx}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                            ? "bg-primary text-white"
                                            : "text-gray-900"
                                    }`
                                }
                                value={status}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${
                                                selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                            }`}
                                        >
                                            {status.name}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                                                <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
}
