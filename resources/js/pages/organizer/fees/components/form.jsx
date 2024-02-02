import { Form, Input } from "@/js/components/form";
import { PrimarySwitch } from "@/js/components/switch";
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
            <div className="block p-2">
                <PrimarySwitch
                    checked={form.data.active}
                    title="Set as active"
                    handler={(value) => form.setData("active", value)}
                />
            </div>
            <div className="block p-2">
                <span className="font-medium text-gray-600">Name</span>
                <Input
                    type="text"
                    name="name"
                    max="25"
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
                <span className="font-medium text-gray-600">Price</span>
                <Input
                    type="number"
                    name="price"
                    value={form.data.price}
                    className={`${
                        form.invalid("price") ? "border-danger" : ""
                    } my-2`}
                    onChange={(e) => form.setData("price", e.target.value)}
                />
                {form.invalid("price") && (
                    <span className="text-danger text-xs">
                        {form.errors.price}
                    </span>
                )}
            </div>
        </Form>
    );
}
