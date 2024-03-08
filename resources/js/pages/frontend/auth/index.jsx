import Layout from "@/js/layouts/full";
import Logo from "@/assets/images/logo.png";
import Banner from "@/assets/images/banners/1.png";
import { Button } from "@/js/components/buttons";

import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import ForgotPassword from "../password/forgot";
import Login from "./login";
import Register from "./register";

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
            <div className="h-screen w-screen md:p-4 text-slate-500 flex xs:max-sm:flex-col items-center justify-center bg-gradient-to-b from-[#36a4a9]  to-[#263c76]">
                <div className="visible h-[11rem] md:h-auto lg:w-[60%] xl:w-[72%] lg:flex flex-col items-center justify-start">
                    <div className="text-center md:p-10 w-full h-full backdrop-saturate-125 text-white">
                        <h1 className="text-2xl md:text-7xl">
                            37th Annual AACCUP National Conference
                        </h1>
                    </div>
                </div>
                <div
                    className={`w-[90%] p-2 md:p-2 lg:p-4 md:w-[50%] lg:w-[40%] xl:w-[28%]  flex items-center justify-center`}
                >
                    <div className="w-full pb-2 px-2 lg:px-4 bg-white rounded-2xl">
                        <div className="w-full relative flex flex-items-center justify-center space-y-1 text-center mb-5 mt-4">
                            <span className="absolute -top-[7rem]">
                                <img className="h-[8rem]" src={Logo} />
                            </span>
                        </div>
                        <div
                            className={`${(() => {
                                if (defferTab == "login") {
                                    return "h-[290px]";
                                } else if (defferTab == "forgot") {
                                    return "h-[175px]";
                                } else if (defferTab == "registration") {
                                    return "h-[280px]";
                                }
                            })()} transition-all ease-in-out delay-100`}
                        >
                            <Transition
                                show={defferTab == "login"}
                                enter="transition-opacity duration-1000"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                className="flex flex-col justify-between gap-y-4"
                            >
                                {tab == "login" && (
                                    <>
                                        <Login setTab={setTab} />
                                        <span
                                            onClick={(e) =>
                                                setTab("registration")
                                            }
                                            className={`hover:text-purple-500 hover:font-bold
                                                 before:hover:border-purple-500 before:block before:mr-1 before:border-b before:border-slate-400/60 before:grow before:h-[1px]
                                                  after:hover:border-purple-500  after:ml-1 after:block after:border-b after:border-slate-400/60 after:grow after:h-[1px] 
                                                  cursor-pointer  hover:animate-pulse h-10 w-full flex space-x-1 justify-center items-center text-center uppercase text-xs`}
                                        >
                                            <span>
                                                Signup here as Organizer
                                            </span>
                                        </span>
                                    </>
                                )}
                            </Transition>
                            <Transition
                                show={defferTab == "registration"}
                                enter="transition-opacity duration-1000"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                className="flex flex-col gap-y-4"
                            >
                                {tab == "registration" && (
                                    <>
                                        <Register setTab={setTab} />
                                        <span
                                            onClick={(e) => setTab("login")}
                                            className={`hover:text-purple-500 hover:font-bold
                                                 before:hover:border-purple-500 before:block before:mr-1 before:border-b before:border-slate-400/60 before:grow before:h-[1px]
                                                  after:hover:border-purple-500  after:ml-1 after:block after:border-b after:border-slate-400/60 after:grow after:h-[1px] 
                                                  cursor-pointer  hover:animate-pulse h-10 w-full flex space-x-1 justify-center items-center text-center uppercase text-xs`}
                                        >
                                            Back to login
                                        </span>
                                    </>
                                )}
                            </Transition>
                            <Transition
                                show={defferTab == "forgot"}
                                enter="transition-opacity duration-1000"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                className="flex flex-col justify-between gap-y-4"
                            >
                                {tab == "forgot" && (
                                    <>
                                        <ForgotPassword />

                                        <span
                                            onClick={(e) => setTab("login")}
                                            className={`hover:text-purple-500 hover:font-bold
                                                before:hover:border-purple-500 before:block before:mr-1 before:border-b before:border-slate-400/60 before:grow before:h-[1px]
                                                after:hover:border-purple-500  after:ml-1 after:block after:border-b after:border-slate-400/60 after:grow after:h-[1px] 
                                                cursor-pointer hover:animate-pulse h-10 w-full flex space-x-1 justify-center items-center text-center uppercase text-xs`}
                                        >
                                            Back to login
                                        </span>
                                    </>
                                )}
                            </Transition>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
