import { Form, Input } from "@/js/components/form";
import { Button } from "@/js/components/buttons";
import { useForm } from "laravel-precognition-react-inertia";
import { AlertDanger, AlertSuccess } from "@/js/components/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

export default memo(function Component() {
    const form = useForm("post", route("forgot-password.send"), {
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
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
        <Form onSubmit={submit} className="">
            <div className="flex flex-col space-y-4">
                <div>
                    {form.errors.email && (
                        <AlertDanger>{form.errors.email}</AlertDanger>
                    )}
                    {form.recentlySuccessful && (
                        <AlertSuccess>
                            A password reset link was sent to your email
                            address.
                        </AlertSuccess>
                    )}
                </div>
                <div>
                    <Input
                        type="text"
                        placeholder="Email"
                        value={form.data.email}
                        onChange={(e) => form.setData("email", e.target.value)}
                    />
                    {form.invalid("email") && (
                        <span className="text-danger text-xs">
                            {form.errors.email}
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
                        <span>Send</span>
                    </Button>
                </div>
            </div>
        </Form>
    );
});
