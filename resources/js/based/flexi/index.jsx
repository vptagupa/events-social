import Attributes from "./components/attributes";
import Flex from "./components/flex";

import { Transition } from "@headlessui/react";

export default function Flexi({ flexia }) {
    console.log(flexia);
    return (
        <>
            <div className="w-[80%] flex flex-col gap-y-2 min-h-[30rem] text-xs md:text-sm">
                <div className="flex items-center justify-between">
                    <div></div>
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
                            className="w-full"
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

            <div className="w-[15%] fixed right-6 flex flex-col gap-y-2 min-h-[10rem] box-border border-l border-slate-300 p-2">
                <Attributes {...flexia} />
            </div>
        </>
    );
}
