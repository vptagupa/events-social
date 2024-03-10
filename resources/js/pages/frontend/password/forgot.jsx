import { Form, Input } from "@/js/components/form";
import { Button } from "@/js/components/buttons";
import { useForm } from "laravel-precognition-react-inertia";
import { AlertDanger, AlertSuccess } from "@/js/components/alerts";
import { memo } from "react";

export default memo(function Component() {
    const form = useForm("post", route("forgot-password.send"), {
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (form.processing) return;

        form.submit({
            only: ["errors"],
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                form.clearErrors();
                form.reset();
            },
        });
    };

    return (
        <>
            <div className="relative">
                <div
                    className={`${
                        form.errors.email || form.recentlySuccessful
                            ? "opacity-100"
                            : "opacity-0"
                    } transition ease-out delay-200 absolute -top-10 w-full`}
                >
                    {form.errors.email && (
                        <AlertDanger className="!text-xs">
                            {form.errors.email}
                        </AlertDanger>
                    )}
                    {form.recentlySuccessful && (
                        <AlertSuccess className="!text-xs">
                            A password reset link was sent to your email
                            address.
                        </AlertSuccess>
                    )}
                </div>
            </div>
            <Form onSubmit={submit} className="">
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
                            <span className="relative text-danger text-xs">
                                <p className="absolute">{form.errors.email}</p>
                            </span>
                        )}
                    </div>
                    <div className="text-center !mt-10">
                        <Button
                            processing={form.processing}
                            className="flex justify-center w-full text-center text-white font-bold uppercase bg-[#36a4a9]"
                        >
                            Send
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    );
});
