import { Form, Input } from "@/js/components/form";
import { Button } from "@/js/components/buttons";
import { useForm } from "laravel-precognition-react-inertia";
import { AlertDanger } from "@/js/components/alerts";
import Remember from "./remember";
import { useState, useEffect } from "react";
import Socialite from "./socialite";

export default function Component({ setTab }) {
    const [remember, setRemember] = useState(false);

    const form = useForm("post", route("organizer.login.auth"), {
        email: "jhoanna@gmail.com",
        password: "BsrhJV",
        remember: remember,
    });

    const submit = (e) => {
        e.preventDefault();
        if (form.processing) return;

        form.submit({
            preserveState: true,
            preserveScroll: true,
        });
    };

    useEffect(() => {
        form.setData("remember", remember);
    }, [remember]);

    return (
        <>
            <div className="relative">
                <div
                    className={`${
                        form.errors.message ? "opacity-100" : "opacity-0"
                    } transition ease-out delay-200 absolute -top-10 w-full`}
                >
                    <AlertDanger className="!text-xs">
                        {form.errors.message}
                    </AlertDanger>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <Form onSubmit={submit}>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <Input
                                type="text"
                                placeholder="Email"
                                value={form.data.email}
                                onChange={(e) =>
                                    form.setData("email", e.target.value)
                                }
                            />
                            {form.invalid("email") && (
                                <span className="relative text-danger text-[0.65rem]">
                                    <p className="absolute">
                                        {form.errors.email}
                                    </p>
                                </span>
                            )}
                        </div>
                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={form.data.password}
                                onChange={(e) =>
                                    form.setData("password", e.target.value)
                                }
                            />
                            {form.invalid("password") && (
                                <span className="relative text-danger text-[0.65rem]">
                                    <p className="absolute">
                                        {form.errors.password}
                                    </p>
                                </span>
                            )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                            <Remember
                                handler={setRemember}
                                checked={remember}
                            />{" "}
                            <span>Remember me</span>
                        </div>
                        <div className="text-center !mt-10">
                            <Button
                                processing={form.processing}
                                className="flex justify-center w-full text-center text-white font-bold uppercase bg-gradient-to-r  from-purple-400 to-indigo-400"
                            >
                                <span>SIGN IN</span>
                            </Button>
                            <p
                                className="mt-2 text-end cursor-pointer text-xs text-blue-400 hover:text-blue-800"
                                onClick={(e) => setTab("forgot")}
                            >
                                Forgot password
                            </p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <span className="text-xs border-b border-slate-200 pb-1">
                                For quick access, sign-in as:
                            </span>
                            <Socialite processing={form.processing} />
                        </div>
                    </div>
                </Form>
            </div>
        </>
    );
}
