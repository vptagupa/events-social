import Layout from "@/js/layouts/public";
import { useControl } from "./control";
import { ErrorBoundary } from "react-error-boundary";
import Stepper from "./components/stepper";
import { ControlContext } from "./context";

export default function Registration({ workshop }) {
    const control = useControl(workshop.event.registration_form.schema.flexis);

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
