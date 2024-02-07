import { Form } from "@/js/components/form";
import { Input, Check } from "@/js/based/form";
import { AlertSuccess } from "@/js/components/alerts";
import { Transition } from "@headlessui/react";

export default function Component({ form }) {
    return (
        <Form className="text-sm">
            <div>
                <Transition show={form.recentlySuccessful}>
                    <AlertSuccess>Successfully save.</AlertSuccess>
                </Transition>
            </div>
            <Input
                error={form.invalid("name") ? form.errors.name : null}
                title={"Name"}
                value={form.data.name}
                onChange={(e) => {
                    form.setData("name", e.target.value);
                }}
            />
            <Input
                type="email"
                error={form.invalid("email") ? form.errors.email : null}
                title={"Email"}
                value={form.data.email}
                onChange={(e) => {
                    form.setData("email", e.target.value);
                }}
            />
            {form.data.password !== undefined && (
                <>
                    <div className="block float-right">
                        <Check
                            title="Use default password."
                            checked={form.data.default_checked_password}
                            onChange={(e) => {
                                form.setData(
                                    "default_checked_password",
                                    e.target.checked
                                );
                            }}
                            name="default_checked_password"
                        />
                    </div>

                    <Input
                        type="password"
                        name="password"
                        title={"Password"}
                        value={form.data.password}
                        disabled={form.data.default_checked_password}
                        className={`${
                            form.invalid("password") ? "border-danger" : ""
                        } my-2`}
                        onChange={(e) =>
                            form.setData("password", e.target.value)
                        }
                        error={
                            !form.data.default_checked_password &&
                            form.invalid("password")
                                ? form.errors.password
                                : null
                        }
                    />
                </>
            )}
        </Form>
    );
}
