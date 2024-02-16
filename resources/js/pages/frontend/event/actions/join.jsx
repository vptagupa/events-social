import { Form } from "@/js/components/form";
import { Input } from "@/js/based/form";
import { PrimaryButton } from "@/js/components/buttons";
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

        form.submit({
            preserveState: true,
            preserveScroll: true,
            onError: (errors) => {
                if (errors.reCaptcha) {
                    reCaptcha.current.reset();
                }
            },
        });
    };

    return (
        <div>
            <Form onSubmit={submit}>
                <Input
                    type="email"
                    title="Email Address"
                    placeholder="Email Adress"
                    error={form.invalid("email") ? form.errors.email : null}
                    onChange={(e) => form.setData("email", e.target.value)}
                />
                <div>
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
                <div className="flex items-center justify-center mt-5">
                    <PrimaryButton processing={form.processing}>
                        JOIN
                    </PrimaryButton>
                </div>
            </Form>
        </div>
    );
}
