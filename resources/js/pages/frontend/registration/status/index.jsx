import Layout from "@/js/layouts/public";
import { Link } from "@inertiajs/react";
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
                    <div className="w-full min-h-[500px] flex items-center justify-center transition-all ease-in-out delay-75 duration-150">
                        <div className="text-center p-4 w-full md:w-1/2">
                            {workshop.is_confirmed && (
                                <p className="text-3xl">
                                    Congratulations! Your application has been
                                    successfully confirmed. Your registration
                                    for{" "}
                                    <Link
                                        href={route(
                                            "event.index",
                                            workshop.event.slug
                                        )}
                                        className="underline decoration-pink-500 font-semibold"
                                    >
                                        {workshop.event.title}
                                    </Link>{" "}
                                    is now complete. We look forward to
                                    welcoming you at the event!
                                </p>
                            )}

                            {!workshop.is_confirmed && (
                                <p className="text-3xl">
                                    Thank you for completing your registration.
                                    Your payment is currently under review. We
                                    will notify you once it has been processed.
                                </p>
                            )}
                        </div>
                    </div>
                </ErrorBoundary>
            </Layout>
        </>
    );
}
