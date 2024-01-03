import Layout from "@/js/layouts/layout.auth";
import { Form, Input } from "@/js/components/form";
import { Button } from "@/js/components/buttons";
import { useForm } from "laravel-precognition-react-inertia";
import { AlertDanger, AlertSuccess } from "@/js/components/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { router } from "@inertiajs/react";

export default function Component({ token, status }) {
    const form = useForm("post", route("password.update"), {
        email: "",
        token: token,
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
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
                router.visit(route("login.index"), {
                    only: ["errors"],
                    preserveScroll: true,
                });
            }, 2000);
        }

        return () => clearTimeout(timeout);
    }, [status]);

    return (
        <Layout>
            <div className="flex flex-col justify-start gap-y-5">
                <Form onSubmit={submit}>
                    <div className="flex flex-col space-y-4">
                        <div>
                            {status && <AlertSuccess>{status}</AlertSuccess>}
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
                        <div>
                            <Input
                                type="password"
                                placeholder="Password Confirmation"
                                value={form.data.password_confirmation}
                                onChange={(e) =>
                                    form.setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                            />
                            {form.invalid("password_confirmation") && (
                                <span className="text-danger text-xs">
                                    {form.errors.password_confirmation}
                                </span>
                            )}
                        </div>
                        <div className="text-center !mt-10">
                            <Button className="flex justify-center w-full text-center text-white font-bold uppercase bg-gradient-to-r  from-purple-400 to-indigo-400">
                                {form.processing && (
                                    <FontAwesomeIcon
                                        icon={faSpinner}
                                        className="h-4 mr-2 animate-spin"
                                    />
                                )}
                                <span>Reset</span>
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </Layout>
    );
}
