import { useState, useContext } from "react";
import { Tab } from "@headlessui/react";
import TabContainer from "./tab";
import { ControlContext } from "../../context";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
    const control = useContext(ControlContext);

    return (
        <div className="w-full px-2 py-2 sm:px-0">
            <Tab.Group selectedIndex={control.tab}>
                {control.data.length > 1 && (
                    <Tab.List className="flex space-x-1 rounded-xl bg-gradient-to-t from-[#BF3131] to-[#BF3131] p-1">
                        {control.data.map((flex) => (
                            <Tab
                                key={flex.flex}
                                className={({ selected }) =>
                                    classNames(
                                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                                        "ring-white/60 ring-offset-2 ring-offset-[#BF3131] focus:outline-none focus:ring-2",
                                        selected
                                            ? "bg-white text-[#BF3131] shadow"
                                            : "text-white hover:bg-white/[0.12] hover:text-white"
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
                                "rounded-xl p-3",
                                " ring-white/60 ring-offset-2 ring-offset-[#BF3131] focus:outline-none focus:ring-2"
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
