import Layout from "@/js/layouts/public";
import { ErrorBoundary } from "react-error-boundary";
import Join from "./actions/join";
import { dateDisplay } from "@/js/helpers";

export default function Event({ event }) {
    return (
        <Layout>
            <ErrorBoundary
                Fallback={<p>There was an error while accessing the form</p>}
            >
                <div className="w-full flex items-center justify-start p-3">
                    <div className="w-full md:w-1/3 bg-gradient-to-t from-[#BF3131] to-[#BF3131] p-4 text-white rounded-md">
                        <div className="flex items-center justify-between">
                            <div className="text-2xl">{event.title}</div>
                            <div className="text-xs">
                                {dateDisplay(event.expected_start_at)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full min-h-[500px] flex items-center justify-center  transition-all ease-in-out delay-75 duration-150">
                    <div>
                        <Join event={event} />
                    </div>
                </div>
            </ErrorBoundary>
        </Layout>
    );
}
