import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import menu from "@/js/constants/menu";
import { Link } from "@inertiajs/react";
import Logo from "@/assets/images/logo.png";
import Sidebar from "./sidebar";
import { useState } from "react";

const activeMenu = () => menu.filter((m) => route().current(m.route))[0] ?? [];

export default () => {
    const [open, setOpen] = useState(false);
    const onSiderbarClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <div className="flex justify-between items-center h-12">
                <div className="flex xs:grow lg:hidden">
                    <div className="mr-2">
                        <span
                            onClick={(e) => onSiderbarClick()}
                            className="cursor-pointer"
                        >
                            {!open ? (
                                <FontAwesomeIcon
                                    icon={faBars}
                                    className="h-6 w-6"
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faBars}
                                    className="h-6 w-6"
                                />
                            )}
                        </span>
                    </div>
                    <div className="xs:grow lg:flex-none text-center">
                        <img className="h-8 w-auto inline mr-2" src={Logo} />
                        <span className="xs:max-sm:hidden inline text-slate-600 text-md font-semibold">
                            QuPro
                        </span>
                    </div>
                    <Transition
                        show={open}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed z-50 bg-white left-0 top-[3rem] p-4 rounded-tr-xl rounded-br-xl">
                            <Sidebar />
                        </div>
                    </Transition>
                </div>
                <div className="xs:hidden lg:block">
                    <div className="flex items-center">
                        <HomeIcon className="h-4 w-4" />
                        <ul className="text-xs text-slate-600">
                            <li className="inline px-1 after:content-['/'] after:ml-1">
                                Dashboard
                            </li>
                            <li className="inline">
                                {activeMenu()?.name ?? ""}
                            </li>
                        </ul>
                    </div>
                </div>

                <div>
                    <Menu as="div" className="relative ml-3">
                        <Menu.Button className="outline-2 ">
                            <FontAwesomeIcon
                                icon={faUserAstronaut}
                                className="h-6 "
                            />
                        </Menu.Button>
                        <Transition
                            enter="transition-opacity duration-75"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item className="hidden">
                                    {(active) => (
                                        <a
                                            className="block px-4 py-2 text-sm text-gray-700"
                                            href="#"
                                        >
                                            My Profile
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {(active) => (
                                        <Link
                                            className="block px-4 py-2 text-sm text-gray-700"
                                            href={route("admin.logout")}
                                        >
                                            Logout
                                        </Link>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </>
    );
};
