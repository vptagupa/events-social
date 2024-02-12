import { Radio, File } from "@/js/based/form";
import { Transition } from "@headlessui/react";

export default function Methods({ workshop, form }) {
    return (
        <div
            className={`flex flex-col  gap-y-2 w-full transition-all ease-in-out delay-500 duration-1000 ${
                form.data.method == "upload" ? "h-[250px]" : "h-[150px]"
            } `}
        >
            <div className="flex flex-col gap-y-2 w-full border border-slate-500/60 rounded-xl p-3 mt-5">
                {workshop.event.is_allowed_upload_proof_payment && (
                    <div>
                        <Radio
                            name="method"
                            title="Upload proof of payment"
                            onChange={(e) => form.setData("method", "upload")}
                        />
                    </div>
                )}
                {workshop.event.is_allowed_payment_integration && (
                    <div>
                        <Radio
                            name="method"
                            title="Pay via gateway"
                            onChange={(e) =>
                                form.setData({
                                    ...form.data,
                                    method: "gateway",
                                    file: "",
                                })
                            }
                        />
                    </div>
                )}
            </div>
            <div>
                <Transition
                    show={form.data.method == "upload"}
                    enter="transition-opacity duration-1000 delay-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-75 delay-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className={
                        form.data.method == "upload" ? "visible" : "invisible"
                    }
                >
                    <File
                        title="Proof of payment"
                        accepted=".jpg,.jpeg,.png"
                        classNameContainer="ring-1 ring-slate-500/60"
                        classNameIcon="!text-black/80"
                        onChange={(file) => form.setData("file", file)}
                        remove={(e) => form.setData("file", "")}
                    />
                </Transition>

                <Transition
                    show={form.data.method == "gateway"}
                    enter="transition-opacity duration-1000 delay-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-75 delay-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className={
                        form.data.method == "gateway" ? "visible" : "invisible"
                    }
                >
                    Payment gateway options
                </Transition>
            </div>
        </div>
    );
}
