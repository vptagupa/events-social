import Layout from "@/js/layouts/public";
import { ErrorBoundary } from "react-error-boundary";
import Package from "./components/offer";

export default function Offer({ workshop }) {
    console.log(workshop);
    return (
        <>
            <Layout>
                <ErrorBoundary
                    Fallback={
                        <p>There was an error while accessing the form</p>
                    }
                >
                    <div className="flex xs:max-sm:flex-col gap-y-4 gap-x-4">
                        {workshop.event.offers.map((offer) => (
                            <Package
                                key={offer.id}
                                value={offer}
                                workshop={workshop}
                            />
                        ))}
                    </div>
                </ErrorBoundary>
            </Layout>
        </>
    );
}
