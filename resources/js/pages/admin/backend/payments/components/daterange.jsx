import { DateRange as DateRangeBased } from "react-date-range";
import { useState, Fragment } from "react";
import moment from "moment";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { dateDisplay } from "@/js/helpers";

export default function DateRange() {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: moment(new Date()).days(7),
            key: "selection",
        },
    ]);

    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={`
               
                group inline-flex items-center px-3 py-2 text-xs`}
                    >
                        <span>
                            {dateDisplay(state[0].startDate, "MMMM DD, YYYY")} -{" "}
                            {dateDisplay(state[0].endDate, "MMMM DD, YYYY")}
                        </span>
                        <ChevronDownIcon
                            className={`ml-2 h-5 w-5 transition duration-150 ease-in-out`}
                            aria-hidden="true"
                        />
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute left-1/2 z-10 mt-3 -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                                <div className="">
                                    <DateRangeBased
                                        onChange={(item) =>
                                            setState([item.selection])
                                        }
                                        showSelectionPreview={true}
                                        moveRangeOnFirstSelection={false}
                                        ranges={state}
                                        direction="horizontal"
                                    />
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
