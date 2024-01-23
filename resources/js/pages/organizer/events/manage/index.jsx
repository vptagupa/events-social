import Layout from "@/js/layouts/admin";
import { Suspense } from "react";
import Fallback from "@/js/based/fallback";
import Sidebar from "./sidebar";

export default function Manage({ event }) {
    return (
        <>
            <Layout>
                <div className="xs:p-2 md:px-4">
                    <div className="font-bold text-lg">Manage Event</div>
                    <div className="rounded-2xl shadow-sm bg-white pt-2 pb-3">
                        <div className="relative">
                            <div className="absolute">
                                <Sidebar event={event} />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
