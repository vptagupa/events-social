import { Form, Input } from "@/js/components/form";
import { Button } from "@/js/components/buttons";
import { useForm } from "laravel-precognition-react-inertia";
import { AlertDanger, AlertSuccess } from "@/js/components/alerts";
import Remember from "./remember";
import { useState, useEffect } from "react";

export default function Component({ setTab }) {
    const [remember, setRemember] = useState(false);

    const form = useForm("post", route("login.auth"), {
        email: "",
        password: "",
        remember: remember,
    });

    const submit = (e) => {
        e.preventDefault();
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
                    <div className="flex space-x-2 text-sm">
                        <Remember setEnabled={setRemember} enabled={remember} />{" "}
                        <span>Remember me</span>
                    </div>
                    <div className="text-center !mt-10">
                        <Button className="flex justify-center w-full text-center text-white font-bold uppercase bg-gradient-to-r  from-purple-400 to-indigo-400">
                            <span>Login</span>
                        </Button>
                    </div>
                </div>
            </Form>
            <p
                className="text-end cursor-pointer text-sm text-blue-600 hover:text-blue-800"
                onClick={(e) => setTab("forgot")}
            >
                Forgot Password
            </p>
        </div>
    );
}
