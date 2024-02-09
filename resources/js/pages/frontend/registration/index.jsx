import Layout from "@/js/layouts/public";
import { Suspense } from "react";
import Fallback from "@/js/based/fallback";
import { useControl } from "./control";
import { ErrorBoundary } from "react-error-boundary";
import Stepper from "./components/stepper";

export default function Registration({ workshop }) {
    const control = useControl(workshop.event.registration_form.schema.flexis);
    console.log(control);
    return (
        <>
            <Layout>
                <ErrorBoundary
                    Fallback={
                        <p>There was an error while submitting the form</p>
                    }
                >
                    <Stepper value={control.data} />
                </ErrorBoundary>
            </Layout>
        </>
    );
}
