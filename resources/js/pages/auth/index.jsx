import Layout from "@/js/layouts/auth";

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
            <Transition
                show={defferTab == "login"}
                enter="transition-opacity duration-1000"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
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
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                {tab == "forgot" && (
                    <div className="flex flex-col justify-start gap-y-5">
                        <ForgotPassword />
                        <p
                            className="mt-5 text-end cursor-pointer text-sm text-blue-600 hover:text-blue-800"
                            onClick={(e) => setTab("login")}
                        >
                            Back to Login
                        </p>
                    </div>
                )}
            </Transition>
        </Layout>
    );
}
