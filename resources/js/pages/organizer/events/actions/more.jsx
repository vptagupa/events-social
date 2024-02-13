import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisVertical,
    faPenNib,
} from "@fortawesome/free-solid-svg-icons";

import Delete from "./delete";
import View from "./view";

export default function More({ value, route }) {
    const actions = [
        <View value={value} />,
        <Delete
            value={value}
            url={route.delete(value.organizer.id, value.id)}
        />,
    ];
    return (
        <div className="w-2 text-right">
            <Menu as="div" className="inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center  text-sm font-medium focus:outline-none hover:text-slate-600 hover-pointer">
                        <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            className="h-5 text-slate-300 hover:text-slate-600 r"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    className="absolute"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <ol>
                                {actions.map((action, idx) => (
                                    <li
                                        key={idx}
                                        className="p-2 hover:bg-primary group hover:text-slate-200 rounded-md duration-all ease-in-out delay-100 duration-150 "
                                    >
                                        {action}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
