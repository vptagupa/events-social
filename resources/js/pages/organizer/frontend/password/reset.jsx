import Layout from "@/js/layouts/full";
import { Form, Input } from "@/js/components/form";
import { Button } from "@/js/components/buttons";
import { useForm } from "laravel-precognition-react-inertia";
import { AlertDanger, AlertSuccess } from "@/js/components/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { router } from "@inertiajs/react";
import Logo from "@/assets/images/logo.png";

export default function Component({ token, status }) {
    const form = useForm("post", route("organizer.password.update"), {
        email: "",
        token: token,
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (form.processing) return;

        form.submit({
            only: ["errors", "status"],
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                form.clearErrors();
                form.reset();
            },
        });
    };

    useEffect(() => {
        let timeout;
        if (status) {
            timeout = setTimeout(() => {
                router.visit(route("organizer.login.index"), {
                    only: ["errors"],
                    preserveScroll: true,
                });
            }, 2000);
        }

        return () => clearTimeout(timeout);
    }, [status]);

    return (
        <Layout>
            <div className="h-screen w-screen md:p-4 text-slate-500 flex items-center justify-center bg-gradient-to-r from-indigo-400  to-purple-400">
                <div className="hidden lg:visible lg:w-[60%] xl:w-[72%] lg:flex flex-col items-center justify-start">
                    <div className="text-center p-10 w-full h-full backdrop-saturate-125 bg-white/30">
                        <h1 className="text-9xl">
                            {import.meta.env.VITE_APP_NAME}
                        </h1>
                    </div>
                </div>
                <div
                    className={`w-[90%] p-2 md:p-2 lg:p-4 md:w-[50%] lg:w-[40%] xl:w-[28%]  flex items-center justify-center`}
                >
                    <div className="w-full pb-2 px-2 lg:px-4 bg-white rounded-2xl">
                        <div className="flex flex-col space-y-1 text-center mb-5 mt-4">
                            <span>
                                <img className="h-[3rem] inline" src={Logo} />
                            </span>
                            <h2 className="text-lg font-bold">LaReact</h2>
                        </div>
                        <div className={`transition-all ease-in-out delay-100`}>
                            <div className="flex flex-col justify-start gap-y-5">
                                <div className="relative">
                                    <div
                                        className={`${
                                            status ? "opacity-100" : "opacity-0"
                                        } transition ease-out delay-200 absolute -top-10 w-full`}
                                    >
                                        <AlertSuccess className="!text-xs">
                                            {status}
                                        </AlertSuccess>
                                    </div>
                                </div>
                                <Form onSubmit={submit}>
                                    <div className="flex flex-col space-y-4">
                                        <div>
                                            <Input
                                                type="text"
                                                placeholder="Email"
                                                value={form.data.email}
                                                onChange={(e) =>
                                                    form.setData(
                                                        "email",
                                                        e.target.value
                                                    )
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
                                                    form.setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {form.invalid("password") && (
                                                <span className="text-danger text-xs">
                                                    {form.errors.password}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <Input
                                                type="password"
                                                placeholder="Password Confirmation"
                                                value={
                                                    form.data
                                                        .password_confirmation
                                                }
                                                onChange={(e) =>
                                                    form.setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {form.invalid(
                                                "password_confirmation"
                                            ) && (
                                                <span className="text-danger text-xs">
                                                    {
                                                        form.errors
                                                            .password_confirmation
                                                    }
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-center !mt-10">
                                            <Button
                                                processing={form.processing}
                                                className="flex justify-center w-full text-center text-white font-bold uppercase bg-gradient-to-r  from-purple-400 to-indigo-400"
                                            >
                                                <span>Reset</span>
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
