import Layout from "@/js/layouts/public";
import { Link, router } from "@inertiajs/react";
import { PrimaryButton } from "@/js/components/buttons";
import { ErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function confirmed({ workshop }) {
    const [processing, setProcessing] = useState(false);
    const accept = (e) => {
        router.post(
            route("registration.accepted", workshop.uuid),
            {},
            {
                onBefore: () => setProcessing(true),
                onFinish: () => setProcessing(false),
            }
        );
    };
    return (
        <>
            <Layout>
                <ErrorBoundary
                    Fallback={
                        <p>There was an error while accessing the form</p>
                    }
                >
                    <div>
                        <p className="text-3xl">
                            You have been invited to join this coming{" "}
                            <Link
                                href={route("event.index", workshop.event.slug)}
                                className="underline decoration-pink-500 font-semibold"
                            >
                                {workshop.event.title}
                            </Link>{" "}
                            event.
                        </p>
                    </div>
                    <div className="flex items-center justify-center mt-10">
                        <PrimaryButton
                            type="button"
                            className="!h-16 !text-2xl py-2"
                            processing={processing}
                            onClick={accept}
                        >
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="h-10"
                            />

                            <span className="ml-1">ACCEPT</span>
                        </PrimaryButton>
                    </div>
                </ErrorBoundary>
            </Layout>
        </>
    );
}
