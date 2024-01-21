import { Form, Input } from "@/js/components/form";
import { PrimaryButton } from "@/js/components/buttons";
import { useForm } from "laravel-precognition-react-inertia";
import { AlertDanger } from "@/js/components/alerts";

export default function ChangePassword({ handleTab }) {
    const form = useForm("patch", route("admin.backend.user.update_name"), {
        name: "",
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
                            type="text"
                            placeholder="Name"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData("name", e.target.value)
                            }
                        />
                        {form.invalid("name") && (
                            <p className="text-danger text-[0.65rem]">
                                {form.errors.name}
                            </p>
                        )}
                    </div>

                    <div className="mt-10">
                        <PrimaryButton
                            progress={form.processing}
                            className="flex justify-center w-full text-center text-white font-bold uppercase"
                        >
                            <span>Update Name</span>
                        </PrimaryButton>
                    </div>
                </div>
            </Form>
        </>
    );
}
