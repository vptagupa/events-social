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
            method: "",
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

    console.log(form);

    return (
        <>
            <Layout>
                <ErrorBoundary
                    Fallback={
                        <p>There was an error while accessing this page.</p>
                    }
                >
                    <div className="w-full flex items-center justify-center">
                        <div className="w-full md:w-1/2  flex flex-col items-center justify-center gap-y-4 shadow-md border border-amber-200 box-border text-black/80 rounded-md p-4 bg-gradient-to-tr from-amber-400 to-amber-300 transition-all ease-in-out delay-75 duration-150">
                            <Price workshop={workshop} />

                            <Breakdown workshop={workshop} />

                            <Methods workshop={workshop} form={form} />
                            {form.hasErrors && (
                                <AlertDanger>
                                    {form.errors.file ? (
                                        <p>{form.errors.file}</p>
                                    ) : (
                                        ""
                                    )}
                                    {form.errors.method ? (
                                        <p>{form.errors.method}</p>
                                    ) : (
                                        ""
                                    )}
                                </AlertDanger>
                            )}

                            <div className="w-full mt-10 mb-5 flex items-center justify-center">
                                <Button
                                    type="button"
                                    className="bg-white"
                                    processing={form.processing}
                                    onClick={submit}
                                >
                                    PAY
                                </Button>
                            </div>
                        </div>
                    </div>
                </ErrorBoundary>
            </Layout>
        </>
    );
}
