import Layout from "@/js/layouts/admin";
import Table from "./components/table";
import New from "./actions/new";

export default function Fees({ organizer, ...props }) {
    return (
        <>
            <Layout>
                <div className="xs:p-2 md:px-4">
                    <div className="font-bold text-lg">
                        {organizer ? organizer.name.toUpperCase() + " " : ""}
                        Fees
                    </div>
                    <div className="mb-2">
                        {organizer && (
                            <New
                                organizer={organizer}
                                url={route(
                                    "organizer.fees.store",
                                    organizer.id
                                )}
                            />
                        )}
                    </div>
                    <div className="rounded-2xl shadow-sm bg-white pt-2 pb-3">
                        <div className="rounded-2xl">
                            <Table
                                route={{
                                    list: (id) =>
                                        route(
                                            organizer
                                                ? "organizer.fees.list"
                                                : "organizer.fees.anylist",
                                            organizer?.id ?? ""
                                        ),
                                    activate: (organizer, fee, active) =>
                                        route(
                                            "organizer.fees.activate",
                                            {
                                                organizer,
                                                fee,
                                            },
                                            {
                                                active,
                                            }
                                        ),
                                    update: (organizer, fee) =>
                                        route("organizer.fees.update", {
                                            organizer,
                                            fee,
                                        }),
                                    delete: (organizer, fee) =>
                                        route("organizer.fees.destroy", {
                                            organizer,
                                            fee,
                                        }),
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
