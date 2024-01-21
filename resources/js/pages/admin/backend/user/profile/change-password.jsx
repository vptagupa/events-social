import { Form, Input } from "@/js/components/form";
import { PrimaryButton } from "@/js/components/buttons";
import { useForm } from "laravel-precognition-react-inertia";
import { AlertDanger } from "@/js/components/alerts";

export default function ChangePassword({ handleTab }) {
    const form = useForm("patch", route("admin.backend.user.update_password"), {
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    return (
        <>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (form.processing) return;

                    form.submit({
                        onSuccess: () => {
                            handleTab("profile");
                            form.clearErrors();
                            form.reset();
                        },
                    });
                }}
                className="w-full"
            >
                <div className="flex flex-col gap-y-2">
                    <div>
                        <Input
                            type="password"
                            placeholder="Current Password"
                            value={form.data.current_password}
                            onChange={(e) =>
                                form.setData("current_password", e.target.value)
                            }
                        />
                        {form.invalid("current_password") && (
                            <p className="text-danger text-[0.65rem]">
                                {form.errors.current_password}
                            </p>
                        )}
                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="New Password"
                            value={form.data.password}
                            onChange={(e) =>
                                form.setData("password", e.target.value)
                            }
                        />
                        {form.invalid("password") && (
                            <p className="text-danger text-[0.65rem]">
                                {form.errors.password}
                            </p>
                        )}
                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            value={form.data.password_confirmation}
                            onChange={(e) =>
                                form.setData(
                                    "password_confirmation",
                                    e.target.value
                                )
                            }
                        />
                        {form.invalid("password_confirmation") && (
                            <p className="text-danger text-[0.65rem]">
                                {form.errors.password_confirmation}
                            </p>
                        )}
                    </div>
                    <div className="mt-10">
                        <PrimaryButton
                            progress={form.processing}
                            className="flex justify-center w-full text-center text-white font-bold uppercase"
                        >
                            <span>Update Password</span>
                        </PrimaryButton>
                    </div>
                </div>
            </Form>
        </>
    );
}
