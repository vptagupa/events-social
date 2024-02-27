import Layout from "@/js/layouts/public";
import { useControl } from "./control";
import { ErrorBoundary } from "react-error-boundary";
import Stepper from "./components/stepper";
import { ControlContext } from "./context";
import { router } from "@inertiajs/react";
import { AlertDanger } from "@/js/components/alerts";

export default function Registration({ workshop, registrationForm, errors }) {
    const control = useControl({
        flexis: registrationForm,
        onNext: (form, setProcessingStatus) => {
            return new Promise((resolve, reject) => {
                router.post(
                    route("registration.store", workshop.uuid),
                    {
                        flex: form,
                    },
                    {
                        forceFormData: true,
                        onBefore: () => setProcessingStatus("next", true),
                        onFinish: () => setProcessingStatus("next", false),
                        onSuccess: () => resolve(true),
                        onError: () => reject(false),
                    }
                );
            });
        },
        onSubmit: (form, setProcessingStatus) => {
            router.post(
                route("registration.register", workshop.uuid),
                {
                    flexis: control.data,
                },
                {
                    forceFormData: true,
                    onBefore: () => setProcessingStatus("next", true),
                    onFinish: () => setProcessingStatus("next", false),
                }
            );
        },
    });

    return (
        <>
            <Layout>
                <ErrorBoundary
                    Fallback={
                        <p>There was an error while submitting the form</p>
                    }
                >
                    <div className="w-full min-h-[500px] mt-10 flex flex-col items-center justify-center transition-all ease-in-out delay-75 duration-150">
                        <div className="text-2xl text-center flex items-center justify-center p-8 w-full md:w-1/2">
                            {workshop.event.title}
                        </div>
                        <div className="p-4 w-full md:w-1/2">
                            {(errors?.flex || errors?.flexis) && (
                                <AlertDanger>
                                    {errors?.flex || errors?.flexis}
                                </AlertDanger>
                            )}

                            <ControlContext.Provider value={control}>
                                <Stepper />
                            </ControlContext.Provider>
                        </div>
                    </div>
                </ErrorBoundary>
            </Layout>
        </>
    );
}
