import { Form, Input } from "@/js/components/form";
import { Button } from "@/js/components/buttons";
import { useForm } from "@/js/helpers/form";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useEffect } from "react";

export default function Join({ event }) {
    const reCaptcha = useRef();
    const { form } = useForm({
        method: "post",
        route: route("event.join", event.slug),
        data: {
            email: "",
            reCaptcha: "",
        },
    });

    const submit = (e) => {
        e.preventDefault();

        if (form.data.reCaptcha == "" || form.data.email == "") return;

        form.submit({
            preserveState: true,
            preserveScroll: true,
            onError: (errors) => {
                if (errors) {
                    reCaptcha.current.reset();
                }
            },
        });
    };

    return (
        <Form
            onSubmit={submit}
            className="relative flex flex-col items-center justify-center gap-y-2 w-full px-4 py-2"
        >
            {form.invalid("email") && (
                <div className="absolute -top-[70px] md:-top-[50px] block w-full p-3 mb-2 text-xs bg-red-600 rounded-lg">
                    <span className="text-white">{form.errors.email}</span>
                </div>
            )}
            <div className="block w-full">
                <Input
                    type="email"
                    placeholder="Email Address"
                    value={form.data.email}
                    className={`!text-2xl !w-full !p-4 !shadow-md !shadow-[#BF3131]/20`}
                    error={form.invalid("email") ? form.errors.email : null}
                    onChange={(e) => form.setData("email", e.target.value)}
                />
            </div>
            <div className="mt-5 w-full flex items-center justify-center">
                <ReCAPTCHA
                    ref={reCaptcha}
                    sitekey={import.meta.env.VITE_GOOGLE_SITE_KEY}
                    onChange={(token) => form.setData("reCaptcha", token)}
                />
                {form.invalid("reCaptcha") && (
                    <span className="text-xs text-danger">
                        {form.errors.reCaptcha}
                    </span>
                )}
            </div>
            <div className="w-full p-2 flex items-center justify-center mt-3 bg-slate-300/80 rounded-lg">
                <p className="text-xs">
                    By joining, you will receive an email containing a tracking
                    link for your registration.
                </p>
            </div>
            <div className="flex items-center justify-center mt-2">
                <Button
                    processing={form.processing}
                    className="!text-3xl bg-gradient-to-t from-[#BF3131] to-[#BF3131] text-white"
                >
                    JOIN
                </Button>
            </div>
        </Form>
    );
}
