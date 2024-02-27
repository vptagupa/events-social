import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useState } from "react";
import Info from "./info";
import Form from "./form";
import Actions from "./actions";
import { Transition } from "@headlessui/react";

export default memo(function Drawer({
    state,
    meta,
    value,
    setStateValue,
    submit,
}) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`absolute flex items-center justify-start w-full h-full z-50
                transition-all ease-in-out delay-200 duration-700 
                ${open ? "translate-x-[0%]" : "translate-x-[100%]"}
            `}
        >
            <FontAwesomeIcon
                icon={open ? faAnglesRight : faAnglesLeft}
                title={`${open ? "Close drawer" : "Open drawer"}`}
                className={`text-xl cursor-pointer transition-all bg-primary rounded-lg p-2 ease-in-out hover:scale-150 absolute ${
                    open ? "text-slate-100 -left-2" : "text-white -left-5"
                }`}
                onClick={(e) => setOpen(!open)}
            />
            <div
                className={`bg-slate-400 text-white h-full w-full flex items-center justify-center`}
            >
                <Transition
                    show={open}
                    className="w-full xs:max-sm:flex-col flex items-center justify-between gap-x-10 pl-5"
                    enter="transition-opacity duration-1000 delay-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity delay-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Info value={value} meta={meta} />
                    <div className="w-full md:w-1/2 flex flex-col items-end justify-center gap-y-3">
                        <Form
                            state={state}
                            meta={meta}
                            setStateValue={setStateValue}
                        />
                        <div className="w-full pr-2">
                            <Actions
                                state={state}
                                value={value}
                                submit={async (route, data, process) => {
                                    const res = await submit(
                                        route,
                                        data,
                                        process
                                    );

                                    if (res) setOpen(false);
                                }}
                            />
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    );
});
