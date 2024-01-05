import Layout from "@/js/layouts/public";
import Logo from "@/assets/images/logo.png";
import Banner from "@/assets/images/banners/1.png";

import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import ForgotPassword from "../password/forgot";
import Login from "./login";

export default function Component() {
    const [tab, setTab] = useState("login");
    const [defferTab, setDefferTab] = useState(tab);

    let timeout;
    useEffect(() => {
        timeout = setTimeout(() => {
            setDefferTab(tab);
        }, 200);

        return () => clearTimeout(timeout);
    }, [tab]);

    return (
        <Layout>
            <div className="h-screen w-screen p-4 text-slate-500 flex items-center justify-center bg-gradient-to-r from-indigo-400  to-purple-400">
                <div className="hidden lg:visible lg:w-[60%] xl:w-[72%] lg:flex flex-col items-center justify-start">
                    <div className="text-center p-10 w-full h-full backdrop-saturate-125 bg-white/30">
                        <h1 className="text-9xl">Project Elis</h1>
                    </div>
                </div>
                <div className="w-[80%] p-1 md:p-2 lg:p-4 md:w-[50%] lg:w-[40%] xl:w-[28%]  flex items-center justify-center">
                    <div className="w-full p-2 lg:p-4 bg-white rounded-2xl">
                        <div className="flex flex-col space-y-6 text-center mb-10 mt-2">
                            <span>
                                <img className="h-[4rem] inline" src={Logo} />
                            </span>
                            <h2 className="text-3xl font-bold">LaReact</h2>
                        </div>
                        <div
                            className={` ${
                                defferTab == "login" ? "h-[320px]" : "h-[200px]"
                            } transition-all ease-in-out delay-100`}
                        >
                            <Transition
                                show={defferTab == "login"}
                                enter="transition-opacity duration-1000"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                {tab == "login" && <Login setTab={setTab} />}
                            </Transition>
                            <Transition
                                show={defferTab == "forgot"}
                                enter="transition-opacity duration-1000"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                {tab == "forgot" && (
                                    <div className="flex flex-col justify-start gap-y-5">
                                        <ForgotPassword />
                                        <p
                                            className="mt-5 text-end cursor-pointer text-xs text-blue-400 hover:text-blue-800"
                                            onClick={(e) => setTab("login")}
                                        >
                                            Back to login
                                        </p>
                                    </div>
                                )}
                            </Transition>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
