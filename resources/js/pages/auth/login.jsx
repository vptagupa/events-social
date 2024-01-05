import { Form, Input } from "@/js/components/form";
import { Button } from "@/js/components/buttons";
import { useForm } from "laravel-precognition-react-inertia";
import { AlertDanger } from "@/js/components/alerts";
import Remember from "./remember";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faXTwitter,
    faGithub,
    faSlack,
    faGoogle,
    faApple,
} from "@fortawesome/free-brands-svg-icons";

export default function Component({ setTab }) {
    const [remember, setRemember] = useState(false);

    const form = useForm("post", route("login.auth"), {
        email: "",
        password: "",
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
        <div className="flex flex-col space-y-4">
            <Form onSubmit={submit}>
                <div className="flex flex-col space-y-4">
                    <div>
                        {form.errors.message && (
                            <AlertDanger>{form.errors.message}</AlertDanger>
                        )}
                    </div>
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
                            <span className="text-danger text-xs">
                                {form.errors.email}
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
                            <span className="text-danger text-xs">
                                {form.errors.password}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <Remember handler={setRemember} checked={remember} />{" "}
                        <span>Remember me</span>
                    </div>
                    <div className="text-center !mt-10">
                        <Button
                            progress={form.processing}
                            className="flex justify-center w-full text-center text-white font-bold uppercase bg-gradient-to-r  from-purple-400 to-indigo-400"
                        >
                            <span>Login</span>
                        </Button>
                        <p
                            className="mt-2 text-end cursor-pointer text-xs text-blue-400 hover:text-blue-800"
                            onClick={(e) => setTab("forgot")}
                        >
                            Forgot password
                        </p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div className="flex gap-x-2">
                            <div>
                                <Button
                                    progress={form.processing}
                                    className="flex justify-center items-center text-center !text-[0.7rem] text-slate-700 uppercase !px-3 !py-1 bg-slate-100 !shadow-slate-300/70"
                                >
                                    <FontAwesomeIcon
                                        icon={faGoogle}
                                        className="h-[0.7rem] text-green-600"
                                    />
                                    <span>oogle</span>
                                </Button>
                            </div>
                            <div>
                                <Button
                                    progress={form.processing}
                                    className="flex space-x-1 justify-center items-center text-center text-slate-700 uppercase !text-[0.7rem] !px-3 !py-1 bg-slate-100 !shadow-slate-300/70"
                                >
                                    <FontAwesomeIcon
                                        icon={faFacebook}
                                        className="h-[0.7rem] text-indigo-800"
                                    />
                                    <span>Facebook</span>
                                </Button>
                            </div>
                            <div>
                                <Button
                                    progress={form.processing}
                                    className="flex space-x-1 justify-center items-center text-center text-slate-700 uppercase !text-[0.7rem] !px-3 !py-1 bg-slate-100 !shadow-slate-300/70"
                                >
                                    <FontAwesomeIcon
                                        icon={faXTwitter}
                                        className="h-[0.7rem] text-cyan-600"
                                    />
                                    <span>Twitter</span>
                                </Button>
                            </div>
                        </div>
                        <div className="flex gap-x-2">
                            <div>
                                <Button
                                    progress={form.processing}
                                    className="flex space-x-1 justify-center items-center text-center text-slate-700 uppercase !text-[0.7rem] !px-3 !py-1 bg-slate-100 !shadow-slate-300/70"
                                >
                                    <FontAwesomeIcon
                                        icon={faApple}
                                        className="h-[0.7rem] text-slate-600"
                                    />
                                    <span>Apple Id</span>
                                </Button>
                            </div>
                            <div>
                                <Button
                                    progress={form.processing}
                                    className="flex space-x-1 justify-center items-center text-center text-slate-700 uppercase !text-[0.7rem] !px-3 !py-1 bg-slate-100 !shadow-slate-300/70"
                                >
                                    <FontAwesomeIcon
                                        icon={faSlack}
                                        className="h-[0.7rem] text-pink-600"
                                    />
                                    <span>Slack</span>
                                </Button>
                            </div>
                            <div>
                                <Button
                                    progress={form.processing}
                                    className="flex space-x-1 justify-center items-center text-center text-slate-700 uppercase !text-[0.7rem] !px-3 !py-1 bg-slate-100 !shadow-slate-300/70"
                                >
                                    <FontAwesomeIcon
                                        icon={faGithub}
                                        className="h-[0.7rem]"
                                    />
                                    <span>Github</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
}
