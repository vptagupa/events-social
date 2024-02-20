import Layout from "@/js/layouts/public";
import { ErrorBoundary } from "react-error-boundary";
import Price from "./components/price";
import Breakdown from "./components/breakdown";
import Methods from "./components/methods";
import { Button } from "@/js/components/buttons";
import { AlertDanger } from "@/js/components/alerts";
import { useForm } from "@/js/helpers/form";

export default function Payment({ workshop }) {
    const { form } = useForm({
        method: "post",
        route: route("registration.payCreate", workshop.uuid),
        data: {
            file: "",
            method:
                workshop.event.is_allowed_upload_proof_payment &&
                !workshop.event.is_allowed_payment_integration
                    ? "upload"
                    : "",
            reference: "",
        },
    });

    const submit = (e) => {
        if (form.processing) return;

        form.submit({
            preseverScroll: true,
            preserveState: true,
            forceFormData: true,
        });
    };

    return (
        <>
            <Layout>
                <ErrorBoundary
                    Fallback={
                        <p>There was an error while accessing this page.</p>
                    }
                >
                    <div className="w-full min-h-[500px] flex items-center justify-center transition-all ease-in-out delay-75 duration-150">
                        <div className="p-4 w-full md:w-1/2">
                            <div className="w-full px-2 py-10 sm:px-0">
                                <div className="bg-white rounded-md p-4 flex flex-col items-center justify-center gap-y-4">
                                    <Price workshop={workshop} />

                                    <Breakdown workshop={workshop} />

                                    <Methods workshop={workshop} form={form} />
                                    {form.invalid("method") && (
                                        <AlertDanger>
                                            <p>{form.errors.method}</p>
                                        </AlertDanger>
                                    )}

                                    <div className="w-full mt-10 mb-5 flex items-center justify-center">
                                        <Button
                                            type="button"
                                            className="bg-gradient-to-t from-[#BF3131] to-[#BF3131] !text-white !text-2xl"
                                            processing={form.processing}
                                            onClick={submit}
                                        >
                                            PAY
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ErrorBoundary>
            </Layout>
        </>
    );
}
