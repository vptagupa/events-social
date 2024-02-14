import Layout from "@/js/layouts/public";
import { ErrorBoundary } from "react-error-boundary";

export default function confirmed({ workshop }) {
    return (
        <>
            <Layout>
                <ErrorBoundary
                    Fallback={
                        <p>There was an error while accessing the form</p>
                    }
                >
                    <p className="text-3xl">
                        Thank you for completing your registration. Your payment
                        is currently under review. We will notify you once it
                        has been processed.
                    </p>
                    <p className="text-xl mt-10">
                        If you have any questions, please feel free to contact
                        us.
                    </p>
                </ErrorBoundary>
            </Layout>
        </>
    );
}
