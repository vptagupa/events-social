import { useState, useContext } from "react";
import { Tab } from "@headlessui/react";
import TabContainer from "./tab";
import { ControlContext } from "../context";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
    const control = useContext(ControlContext);
    console.log(control.data.length);
    return (
        <div className="w-full px-2 py-16 sm:px-0">
            <Tab.Group selectedIndex={control.tab}>
                {control.data.length > 1 && (
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                        {control.data.map((flex) => (
                            <Tab
                                key={flex.flex}
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
                                {flex.config.name}
                            </Tab>
                        ))}
                    </Tab.List>
                )}

                <Tab.Panels className="mt-2">
                    {control.data.map((flex) => (
                        <Tab.Panel
                            key={flex.flex}
                            className={classNames(
                                "rounded-xl bg-white p-3",
                                " ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                            )}
                        >
                            <TabContainer value={flex} />
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
