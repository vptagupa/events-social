import Layout from "@/js/layouts/full";
import { Form, Input } from "@/js/components/form";
import { Button } from "@/js/components/buttons";
import { useForm } from "laravel-precognition-react-inertia";
import { AlertDanger } from "@/js/components/alerts";
import Logo from "@/assets/images/logo.png";

export default () => {
    const form = useForm("post", route("admin.auth.change-password.update"), {
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (form.processing) return;

        form.submit({
            preserveState: true,
            preserveScroll: true,
        });
    };

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
                            <div>
                                <div className="relative">
                                    <div
                                        className={`${
                                            form.errors.message
                                                ? "opacity-100"
                                                : "opacity-0"
                                        } transition ease-out delay-200 absolute -top-10 w-full`}
                                    >
                                        <AlertDanger className="!text-xs">
                                            {form.errors.message}
                                        </AlertDanger>
                                    </div>
                                </div>
                                <div>
                                    <p>You are using a default password. </p>
                                    <p>
                                        Change your password to access your
                                        account.
                                    </p>
                                </div>
                                <div>
                                    <Form onSubmit={submit}>
                                        <div className="flex flex-col space-y-4">
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
                                                <span className="text-[.7rem]">
                                                    Minimum of 6 characters with
                                                    at least 1 number and
                                                    letter.
                                                </span>
                                                {form.invalid("password") && (
                                                    <span className="text-danger text-xs block">
                                                        {form.errors.password}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="text-center !mt-10">
                                                <Button
                                                    processing={form.processing}
                                                    className="flex justify-center w-full text-center text-white font-bold uppercase bg-gradient-to-r  from-purple-400 to-indigo-400"
                                                >
                                                    <span>Change Password</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
