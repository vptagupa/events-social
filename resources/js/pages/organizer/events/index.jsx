import Layout from "@/js/layouts/admin";
import Table from "./components/table";
import New from "./actions/new";
import { Suspense } from "react";
import Fallback from "@/js/based/fallback";

export default function Events({ organizer, ...props }) {
    return (
        <>
            <Layout>
                <div className="xs:p-2 md:px-4">
                    <div className="font-bold text-lg">
                        {organizer ? organizer.name.toUpperCase() + " " : ""}
                        Events
                    </div>
                    <div className="mb-2">
                        <Suspense fallback={<Fallback />}>
                            {organizer && (
                                <New
                                    organizer={organizer}
                                    url={route(
                                        "organizer.events.store",
                                        organizer.id
                                    )}
                                />
                            )}
                        </Suspense>
                    </div>
                    <div className="rounded-2xl shadow-sm bg-white pt-2 pb-3">
                        <div className="rounded-2xl">
                            <Suspense fallback={<Fallback />}>
                                <Table
                                    route={{
                                        list: route(
                                            organizer
                                                ? "organizer.events.list"
                                                : "organizer.events.anyList",
                                            organizer?.id ?? ""
                                        ),
                                        activate: (organizer, event, active) =>
                                            route(
                                                "organizer.events.activate",
                                                {
                                                    organizer,
                                                    event,
                                                },
                                                {
                                                    active,
                                                }
                                            ),
                                        update: (organizer, event) =>
                                            route("organizer.events.update", {
                                                organizer,
                                                event,
                                            }),
                                        delete: (organizer, event) =>
                                            route("organizer.events.destroy", {
                                                organizer,
                                                event,
                                            }),
                                    }}
                                />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
