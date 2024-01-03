import Layout from "@/js/layouts/layout.auth";
import { Form, Input } from "@/js/components/form";
import { Button } from "@/js/components/buttons";
import { useForm } from "laravel-precognition-react-inertia";
import { AlertDanger } from "@/js/components/alerts";

export default () => {
    const form = useForm("post", route("auth.change-password.update"), {
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        form.submit({
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <Layout>
            <div>
                <div>
                    <p>You are using a default password. </p>
                    <p>Change your password to access your account.</p>
                </div>
                <div>
                    <Form onSubmit={submit}>
                        <div className="flex flex-col space-y-4">
                            <div>
                                {form.errors.message && (
                                    <AlertDanger>
                                        {form.errors.message}
                                    </AlertDanger>
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
                                <span className="text-[.7rem]">
                                    Minimum of 6 characters with at least 1
                                    number and letter.
                                </span>
                                {form.invalid("password") && (
                                    <span className="text-danger text-xs block">
                                        {form.errors.password}
                                    </span>
                                )}
                            </div>

                            <div className="text-center !mt-10">
                                <Button className="flex justify-center w-full text-center text-white font-bold uppercase bg-gradient-to-r  from-purple-400 to-indigo-400">
                                    <span>Change Password</span>
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </Layout>
    );
};
