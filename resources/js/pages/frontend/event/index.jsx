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
                    <div className="w-full md:w-1/3 flex flex-col items-center justify-start gap-y-2 bg-gradient-to-t from-[#BF3131] to-[#BF3131] p-4 text-white rounded-md">
                        <div className="w-full flex items-center justify-between">
                            <div className="text-2xl w-full">{event.title}</div>
                        </div>
                        <div className="w-full flex flex-col items-center justify-start">
                            <div className="text-lg w-full">
                                {" "}
                                {dateDisplay(
                                    event.expected_start_at,
                                    "MMMM DD, YYYY"
                                )}
                            </div>
                            <div className="text-lg w-full">{event.place}</div>
                            <div className="text-sm w-full">
                                {event.address}
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
