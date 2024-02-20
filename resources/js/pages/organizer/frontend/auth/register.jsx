import { Form, Input } from "@/js/components/form";
import { Button } from "@/js/components/buttons";
import { useForm } from "laravel-precognition-react-inertia";
import { AlertDanger } from "@/js/components/alerts";
import Socialite from "./socialite";

export default function Component({ setTab }) {
    const form = useForm("post", route("organizer.register"), {
        email: "",
        name: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (form.processing) return;

        form.submit({
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                form.clearErrors();
                form.reset();
                setTab("login");
            },
        });
    };

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
                                placeholder="Name"
                                value={form.data.name}
                                onChange={(e) =>
                                    form.setData("name", e.target.value)
                                }
                            />
                            {form.invalid("name") && (
                                <span className="relative text-danger text-xs">
                                    <p className="absolute">
                                        {form.errors.name}
                                    </p>
                                </span>
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
                                <span className="relative text-danger text-xs">
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
                                <span className="relative text-danger text-xs">
                                    <p className="absolute">
                                        {form.errors.password}
                                    </p>
                                </span>
                            )}
                        </div>

                        <div className="text-center !mt-10">
                            <Button
                                processing={form.processing}
                                className="flex justify-center w-full text-center text-white font-bold uppercase bg-gradient-to-r  from-purple-400 to-indigo-400"
                            >
                                <span>Signup</span>
                            </Button>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <span className="text-xs border-b border-slate-200 pb-1">
                                For a quick access, sign-up as:
                            </span>
                            <Socialite processing={form.processing} />
                        </div>
                    </div>
                </Form>
            </div>
        </>
    );
}
