import Layout from "@/js/layouts/public";
import { ErrorBoundary } from "react-error-boundary";
import Join from "./actions/join";

export default function confirmed({ event }) {
    return (
        <Layout>
            <ErrorBoundary
                Fallback={<p>There was an error while accessing the form</p>}
            >
                <div className="w-full flex items-center justify-center">
                    <div className="w-full md:w-2/3  flex flex-col items-center justify-center gap-y-4 shadow-md border border-amber-200 box-border text-black/80 rounded-md p-4 bg-gradient-to-tr from-amber-400 to-amber-300 transition-all ease-in-out delay-75 duration-150">
                        <div className="">{event.title}</div>
                        <div>{event.description}</div>
                        <div>
                            <Join event={event} />
                        </div>
                    </div>
                </div>
            </ErrorBoundary>
        </Layout>
    );
}
