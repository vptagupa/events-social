import { Form } from "@/js/components/form";
import { Input } from "@/js/based/form";
import { PrimaryButton } from "@/js/components/buttons";
import { useForm } from "@/js/helpers/form";

export default function Join({ event }) {
    const { form } = useForm({
        method: "post",
        route: route("event.join", event.slug),
        data: {
            email: "",
        },
    });

    const submit = (e) => {
        e.preventDefault();
        form.submit({
            preserveState: true,
            preserveScroll: true,
        });
    };

    console.log(form.errors);
    return (
        <div>
            <Form onSubmit={submit}>
                <Input
                    type="email"
                    title="Email Adress"
                    placeholder="Email Adress"
                    error={form.invalid("email") ? form.errors.email : null}
                    onChange={(e) => form.setData("email", e.target.value)}
                />
                <div className="flex items-center justify-center mt-5">
                    <PrimaryButton processing={form.processing}>
                        JOIN
                    </PrimaryButton>
                </div>
            </Form>
        </div>
    );
}
