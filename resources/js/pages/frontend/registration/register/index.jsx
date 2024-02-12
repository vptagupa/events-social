import Layout from "@/js/layouts/public";
import { useControl } from "./control";
import { ErrorBoundary } from "react-error-boundary";
import Stepper from "./components/stepper";
import { ControlContext } from "./context";
import axios from "axios";
import { router } from "@inertiajs/react";

export default function Registration({ workshop }) {
    const control = useControl({
        flexis: workshop.event.registration_form.schema.flexis,
        onNext: async (form) => {
            await axios.post(route("registration.store", workshop.uuid), {
                flex: form,
            });
        },
        onSubmit: (form) => {
            router.post(route("registration.register", workshop.uuid), {
                flexis: control.data,
            });
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
                    <ControlContext.Provider value={control}>
                        <Stepper />
                    </ControlContext.Provider>
                </ErrorBoundary>
            </Layout>
        </>
    );
}
