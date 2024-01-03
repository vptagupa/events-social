import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faIgloo,
    faUser,
    faBars,
    faBarsStaggered,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "@/assets/images/logo.png";
import Sidebar from "./sidebar";
import { useState } from "react";

export default function Index(props) {
    const [mobileBar, setMobileBar] = useState(false);
    return (
        <>
            <div className="bg-slate-100 text-slate-500 w-screen h-screen flex xs:max-sm:pl-4 md:pl-6 pt-4 pr-4">
                <div className="md:w-[13%] flex flex-col">
                    <div className="xs:max-sm:hidden h-12 flex gap-x-3 items-center justify-center text-xs">
                        <img src={Logo} className="h-6 w-6" /> LaReact
                    </div>
                    <div className="xs:max-sm:hidden flex items-center justify-center">
                        <hr className="bg-gradient-to-r from-slate-100 via-slate-500 to-slate-100 w-3/4" />
                    </div>
                    <div
                        className={`${
                            mobileBar
                                ? "xs:max-sm:translate-x-[0%]"
                                : "xs:max-sm:-translate-x-[100%]"
                        } xs:max-sm:absolute xs:max-sm:shadow-md xs:max-sm:z-10 xs:max-sm:mt-7 xs:max-sm:-ml-4 xs:max-sm:bg-slate-200 transform transition-transform delay-100 grow py-4 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-300 scrollbar-track-gray-200`}
                    >
                        <Sidebar />
                    </div>
                </div>
                <div className="grow flex flex-col">
                    <div className="w-full flex items-center justify-between h-6 text-xs">
                        <div className="md:hidden flex gap-x-3 items-center justify-center text-xs">
                            <FontAwesomeIcon
                                icon={mobileBar ? faBarsStaggered : faBars}
                                className="h-6 w-6 cursor-pointer text-slate-400 hover:text-slate-600"
                                onClick={(e) => setMobileBar(!mobileBar)}
                            />
                        </div>
                        <div className="md:hidden flex gap-x-3 items-center justify-center text-xs">
                            <img src={Logo} className="h-6 w-6" />
                        </div>
                        <div className="xs:max-sm:hidden">
                            <ol>
                                <li className="float-left px-1 after:content-['/'] after:ml-2">
                                    <FontAwesomeIcon
                                        icon={faIgloo}
                                        className="h-3"
                                    />
                                </li>
                                <li className="float-left px-1 after:content-['/'] after:ml-2">
                                    Home
                                </li>
                                <li className="float-left px-1">Dashboard</li>
                            </ol>
                        </div>
                        <div>
                            <ol>
                                <li className="float-left px-1 flex gap-x-1 items-center cursor-pointer">
                                    <FontAwesomeIcon
                                        icon={faRightFromBracket}
                                        className="h-6 text-slate-400 hover:text-slate-600"
                                        title="Logout"
                                    />
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className="w-full grow">{props.children}</div>
                    <div className="w-full h-10 p-2 text-xs flex items-center justify-start">
                        Created with love by Vic Tagupa
                    </div>
                </div>
            </div>
        </>
    );
}
