import { Form as FormComponent } from "@/js/components/form";
import { Button } from "@/js/components/buttons";
import { Input, File } from "@/js/based/form";
import { memo } from "react";
import { useForm } from "@/js/helpers/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

export default memo(function Form({ event }) {
    const { form } = useForm({
        method: "post",
        route: route("organizer.events.settings.or.update", {
            event: event.id,
        }),
        data: {
            signature: event?.official_receipt_signature,
            official_receipt_signatory: event?.official_receipt_signatory ?? "",
        },
    });

    return (
        <FormComponent
            className="w-full text-sm"
            onSubmit={(e) => {
                e.preventDefault();
                form.submit({
                    preseverScroll: true,
                    preserveState: true,
                });
            }}
        >
            <div className="w-full gap-y-5">
                <Input
                    title="Signatory name"
                    name="name"
                    value={form.data.official_receipt_signatory}
                    maxLength="70"
                    info={`Length: ${form.data.official_receipt_signatory.length}`}
                    className={`${
                        form.invalid("official_receipt_signatory")
                            ? "border-danger"
                            : ""
                    } my-2 w-full`}
                    onChange={(e) =>
                        form.setData(
                            "official_receipt_signatory",
                            e.target.value
                        )
                    }
                    error={form.errors?.official_receipt_signatory}
                />
                <File
                    title="Signature"
                    name="signature"
                    value={form.data.signature}
                    className={`${
                        form.invalid("signature") ? "border-danger" : ""
                    } my-2`}
                    onChange={(file) => form.setData("signature", file)}
                    remove={(file) => form.setData("signature", null)}
                    error={form.errors?.signature}
                    accept=".jpeg,.jpg,.png"
                />
                <div className="flex items-center justify-end">
                    <Button
                        processing={form.processing}
                        className="uppercase flex items-center text-slate-100 justify-center gap-x-2 bg-slate-400"
                    >
                        <FontAwesomeIcon icon={faSave} className="text-2xl" />{" "}
                        Save
                    </Button>
                </div>
            </div>
        </FormComponent>
    );
});
