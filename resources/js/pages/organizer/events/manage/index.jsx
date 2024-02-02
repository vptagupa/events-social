import Layout from "@/js/layouts/admin";
import Sidebar from "./sidebar";

export default function Event({ event, children }) {
    return (
        <Layout>
            <div className="">
                <div className="font-bold text-lg">
                    Manage [{event.title.toUpperCase()}] event
                </div>
                <div className="flex rounded-2xl shadow-sm bg-white pt-2 pb-3 mt-2">
                    <div className="w-14 z-10 m-2">
                        <Sidebar event={event} />
                    </div>
                    <div className="grow flex items-start justify-center min-h-[32rem]">
                        {children}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
