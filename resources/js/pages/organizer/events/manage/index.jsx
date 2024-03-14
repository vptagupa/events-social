import Layout from "@/js/layouts/admin";
import Sidebar from "./sidebar";

export default function Event({ event, action, children }) {
    return (
        <Layout>
            <div className="mt-5 pr-2">
                <div className="flex sm:max-sm:flex-col xs:max-sm:gap-y-1 items-center justify-between">
                    <div>
                        <div className="font-bold text-lg">
                            Manage [{event.title.toUpperCase()}] event
                        </div>
                    </div>
                    <div className="relative">{action}</div>
                </div>
                <div className="flex rounded-2xl shadow-lg shadow-slate-200 bg-white pt-2 pb-3 mt-2">
                    <div className="w-14 z-10 m-2">
                        <Sidebar event={event} />
                    </div>
                    <div className="grow overflow-x-auto">{children}</div>
                </div>
            </div>
        </Layout>
    );
}
