import { useState } from "react";
import { Tab } from "@headlessui/react";

import Table from "./table";
import Upload from "./upload";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Tabs({ event }) {
    let [tabs] = useState({
        List: <Table event={event} />,
        Upload: <Upload event={event} />,
    });

    return (
        <div className="w-full px-2 py-2 sm:px-0 relative">
            <Tab.Group>
                <Tab.List className="flex w-full max-w-md">
                    {Object.keys(tabs).map((tab) => (
                        <Tab
                            key={tab}
                            className={({ selected }) =>
                                classNames(
                                    "w-full text-sm font-medium leading-5 py-1.5 transition-all ease-in-out delay-100 duration-500",
                                    "outline-none focus:outline-none",
                                    selected
                                        ? "border-b-[3px] border-slate-500"
                                        : ""
                                )
                            }
                        >
                            {tab}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {Object.values(tabs).map((tab, idx) => (
                        <Tab.Panel
                            key={idx}
                            className={classNames(
                                "rounded-xl bg-white p-3",
                                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 transition-all ease-in-out delay-100 duration-500"
                            )}
                        >
                            {tab}
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
