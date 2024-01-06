import Layout from "@/js/layouts/admin";
import Avatar from "@/assets/images/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faEnvelope,
    faKey,
    faLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ChangePassword from "./change-password";
import ChangeName from "./change-name";

export default function Profile({ auth: { user } }) {
    const direction = "-translate-x-[60%]";
    const [tab, setTab] = useState("profile");
    const [out, setOut] = useState(direction);

    const handleChangeTab = (tab) => {
        setTab(tab);
        setOut(out == direction ? "translate-x-[60%]" : direction);
    };

    return (
        <Layout>
            <div className="flex items-center justify-center h-full w-full text-slate-800 ">
                <div className="relative flex flex-col items-center justify-center bg-gradient-to-t from-purple-400 to-fuchsia-400 rounded-lg w-full md:w-1/2 min-h-96">
                    <div className="absolute top-0 right-0  p-2 text-xs">
                        <ol>
                            <li className="float-left mr-2 cursor-pointer">
                                <span
                                    className="flex items-center gap-x-1"
                                    onClick={(e) =>
                                        handleChangeTab("change-name")
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className="h-3 text-blue-800"
                                    />
                                    <span className="border-b border-slate-600 hover:border-purple-600 hover:text-purple-600">
                                        Change name
                                    </span>
                                </span>
                            </li>
                            <li className="float-left  mr-2 cursor-pointer">
                                <span
                                    className="flex items-center gap-x-1"
                                    onClick={(e) =>
                                        handleChangeTab("change-password")
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faKey}
                                        className="h-3 text-yellow-400"
                                    />
                                    <span className="border-b border-slate-600 hover:border-purple-600 hover:text-purple-600">
                                        Change password
                                    </span>
                                </span>
                            </li>
                        </ol>
                    </div>
                    <div
                        className={`${
                            tab == "profile"
                                ? "translate-x-0 opacity-100"
                                : `${out} opacity-0`
                        } transition-all duration-500 fixed grow w-full flex gap-x-2 items-center justify-center`}
                    >
                        <div className="w-40">
                            <img src={Avatar} className="h-40 rounded-full" />
                        </div>
                        <div className="w-40 flex flex-col gap-y-1 ">
                            <span className="flex items-center gap-x-2">
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="h-3"
                                />
                                <span className="border-b border-slate-600 rounded-br-sm w-full">
                                    {user.name}
                                </span>
                            </span>
                            <span className="flex items-center gap-x-2">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="h-3"
                                />
                                <span className="border-b border-slate-600 rounded-br-sm w-full">
                                    {user.email}
                                </span>
                            </span>
                            <span className="flex items-center gap-x-2">
                                <FontAwesomeIcon icon={faKey} className="h-3" />
                                <span className="border-b border-slate-600 rounded-br-sm w-full">
                                    {user.role}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div
                        className={`${
                            tab == "change-password"
                                ? "translate-x-0 opacity-100"
                                : `${out} opacity-0`
                        } transition-all duration-500 fixed grow w-full md:w-1/2 flex flex-col gap-x-2 items-center justify-center`}
                    >
                        <div className="flex w-3/4 md:w-1/2 items-center">
                            <ChangePassword handleTab={handleChangeTab} />
                        </div>
                        <div className="mt-2">
                            <FontAwesomeIcon
                                title="Return"
                                icon={faLeftLong}
                                className="h-6 cursor-pointer hover:text-purple-600"
                                onClick={(e) => handleChangeTab("profile")}
                            />
                        </div>
                    </div>
                    <div
                        className={`${
                            tab == "change-name"
                                ? "translate-x-0 opacity-100"
                                : `${out} opacity-0`
                        } transition-all duration-500 fixed grow w-full md:w-1/2 flex flex-col gap-x-2 items-center justify-center`}
                    >
                        <div className="flex w-3/4 md:w-1/2 items-center">
                            <ChangeName handleTab={handleChangeTab} />
                        </div>
                        <div className="mt-2">
                            <FontAwesomeIcon
                                title="Return"
                                icon={faLeftLong}
                                className="h-6 cursor-pointer hover:text-purple-600"
                                onClick={(e) => handleChangeTab("profile")}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
