import Layout from "@/js/layouts/public";
import { ErrorBoundary } from "react-error-boundary";
import Join from "./actions/join";
import { dateDisplay } from "@/js/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faMap } from "@fortawesome/free-regular-svg-icons";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";

export default function Event({ event }) {
    return (
        <Layout>
            <ErrorBoundary
                Fallback={<p>There was an error while accessing the form</p>}
            >
                <div className="h-screen w-full  flex flex-col items-center justify-center transition-all ease-in-out delay-200 duration-1000">
                    <div className="relative antialiased  w-full md:w-1/2 flex flex-col items-center justify-center transition-all ease-in-out delay-75 duration-150">
                        <div className="z-10 text-white  rounded-3xl shadow-md shadow-slate-400/50 bg-gradient-to-t from-[#BF3131] to-[#BF3131] absolute w-[88%] md:w-2/3 min-h-[300px] max-h-[200px] md:-translate-x-[40%] -translate-y-[60%] md:-translate-y-[50%] border-box border-0 border-red-700">
                            <div className="w-full bg-black/70 p-4 mt-5 mb-5 text-lg md:text-xl text-center flex items-center justify-center">
                                {event.title}
                            </div>
                            <div className="w-full py-4 px-7 gap-y-1 flex flex-col items-center justify-start">
                                <div className="text-sm md:text-lg w-full flex items-center justify-start gap-x-2">
                                    <FontAwesomeIcon
                                        icon={faCalendar}
                                        className="text-2xl w-[30px]"
                                    />
                                    <div className="grow">
                                        {" "}
                                        {dateDisplay(
                                            event.expected_start_at,
                                            "MMMM DD, YYYY h:mm A"
                                        )}
                                    </div>
                                </div>
                                <div className="text-sm md:text-lg w-full">
                                    <div className="w-full flex items-center justify-start gap-x-2">
                                        <FontAwesomeIcon
                                            icon={faLocationPin}
                                            className="text-2xl w-[30px]"
                                        />
                                        <div className="grow">
                                            {event.place}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm md:text-lg w-full">
                                    <div className="w-full flex items-center justify-start gap-x-2">
                                        <FontAwesomeIcon
                                            icon={faMap}
                                            className="text-2xl w-[30px]"
                                        />
                                        <div className="grow">
                                            {event.address}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="z-20 flex flex-col items-center justify-center p-4 rounded-3xl shadow-md shadow-slate-400/50 bg-gradient-to-t from-slate-100 to-slate-200 absolute w-[93%] md:w-2/3 min-h-[300px] translate-y-[20%] border-box border-0 border-blue-700">
                            <Join event={event} />
                        </div>
                    </div>
                </div>
            </ErrorBoundary>
        </Layout>
    );
}
