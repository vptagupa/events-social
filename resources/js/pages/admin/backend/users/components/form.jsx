import { Form, Input, Select, Checkbox } from "@/js/components/form";
import { AlertSuccess } from "@/js/components/alerts";
import { Transition } from "@headlessui/react";

export default function Component({ form, roles }) {
    return (
        <Form className="text-sm">
            <div>
                <Transition show={form.recentlySuccessful}>
                    <AlertSuccess>Successfully save user.</AlertSuccess>
                </Transition>
            </div>
            <div className="block p-2">
                <span className="font-medium text-gray-600">Name</span>
                <Input
                    type="text"
                    name="name"
                    value={form.data.name}
                    className={`${
                        form.invalid("name") ? "border-danger" : ""
                    } my-2`}
                    onChange={(e) => form.setData("name", e.target.value)}
                />
                {form.invalid("name") && (
                    <span className="text-danger text-xs">
                        {form.errors.name}
                    </span>
                )}
            </div>
            <div className="block p-2">
                <span className="font-medium text-gray-600">Email</span>
                <Input
                    type="email"
                    name="email"
                    value={form.data.email}
                    className={`${
                        form.invalid("email") ? "border-danger" : ""
                    } my-2`}
                    onChange={(e) => form.setData("email", e.target.value)}
                />
                {form.invalid("email") && (
                    <span className="text-danger text-xs">
                        {form.errors.email}
                    </span>
                )}
            </div>
            <div className="block p-2">
                <span className="font-medium text-gray-600">Role</span>
                <Select
                    name="role"
                    value={form.data.role}
                    className={`${
                        form.invalid("role") ? "border-danger" : ""
                    } my-2 pr-10`}
                    onChange={(e) => form.setData("role", e.target.value)}
                >
                    <option value="">Select</option>
                    {roles.map((role) => {
                        return (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        );
                    })}
                </Select>
                {form.invalid("role") && (
                    <span className="text-danger text-xs">
                        {form.errors.role}
                    </span>
                )}
            </div>
            {form.data.password !== undefined && (
                <>
                    <div className="block p-2">
                        <div className="flex justify-between">
                            <div className="font-medium text-gray-600">
                                Password
                            </div>
                            <label className="flex items-center space-x-1 cursor-pointer">
                                <Checkbox
                                    checked={form.data.default_checked_password}
                                    onChange={(e) => {
                                        form.setData(
                                            "default_checked_password",
                                            e.target.checked
                                        );
                                    }}
                                    name="default_checked_password"
                                />
                                <span>Use default password.</span>
                            </label>
                        </div>
                    </div>
                    <div className="block px-2">
                        <Input
                            type="password"
                            name="password"
                            value={form.data.password}
                            disabled={form.data.default_checked_password}
                            className={`${
                                form.invalid("password") ? "border-danger" : ""
                            } my-2`}
                            onChange={(e) =>
                                form.setData("password", e.target.value)
                            }
                        />
                        {!form.data.default_checked_password &&
                            form.invalid("password") && (
                                <span className="text-danger text-xs">
                                    {form.errors.password}
                                </span>
                            )}
                    </div>
                </>
            )}
        </Form>
    );
}
