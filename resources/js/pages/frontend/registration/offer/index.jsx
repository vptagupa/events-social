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
                    <div className="w-full min-h-[500px] flex items-center justify-center transition-all ease-in-out delay-75 duration-150">
                        <div className="text-center p-4 w-full md:w-1/2">
                            <div className="flex xs:max-sm:flex-col gap-y-4 gap-x-4">
                                {workshop.event.offers.map((offer) => (
                                    <Package
                                        key={offer.id}
                                        value={offer}
                                        workshop={workshop}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </ErrorBoundary>
            </Layout>
        </>
    );
}
