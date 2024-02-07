import { Form } from "@/js/components/form";
import { File } from "@/js/based/form";
import { AlertSuccess, AlertDanger } from "@/js/components/alerts";
import { Transition } from "@headlessui/react";

export default function Component({ form, file, handleRemove }) {
    return (
        <Form className="text-sm">
            <div className="mb-2">
                <Transition show={form.recentlySuccessful}>
                    <AlertSuccess>Successfully save.</AlertSuccess>
                </Transition>
                <Transition show={form.errors?.registration ? true : false}>
                    <AlertDanger>{form.errors?.registration}</AlertDanger>
                </Transition>
            </div>
            <File
                error={form.invalid("file") ? form.errors.file : null}
                title={
                    "Upload proof of payment in image format (jpg and png only)."
                }
                value={form.data.upp}
                onChange={(e) => {
                    form.setData("file", e.target.files[0]);
                }}
                accept=" .jpg, .jpeg, .png, .mp4"
                remove={handleRemove}
            />
        </Form>
    );
}
