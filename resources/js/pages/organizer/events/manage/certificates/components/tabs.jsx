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
                <Tab.List className="flex w-full max-w-md space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {Object.keys(tabs).map((tab) => (
                        <Tab
                            key={tab}
                            className={({ selected }) =>
                                classNames(
                                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                                    "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                    selected
                                        ? "bg-white text-blue-700 shadow"
                                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
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
                                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
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
