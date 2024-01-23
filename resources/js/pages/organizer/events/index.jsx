import Layout from "@/js/layouts/admin";
import Table from "./components/table";
import New from "./actions/new";
import { Suspense } from "react";
import Fallback from "@/js/based/fallback";

export default function Events(props) {
    return (
        <>
            <Layout>
                <div className="xs:p-2 md:px-4">
                    <div className="font-bold text-lg">Events</div>
                    <div className="mb-2">
                        <Suspense fallback={<Fallback />}>
                            <New />
                        </Suspense>
                    </div>
                    <div className="rounded-2xl shadow-sm bg-white pt-2 pb-3">
                        <div className="rounded-2xl">
                            <Suspense fallback={<Fallback />}>
                                <Table />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
