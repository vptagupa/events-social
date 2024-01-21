import Layout from "@/js/layouts/admin";
import Table from "./components/table";
import New from "./actions/new";

export default function Users(props) {
    return (
        <>
            <Layout>
                <div className="xs:p-2 md:px-4">
                    <div className="font-bold text-lg">User</div>
                    <div className="mb-2">
                        <New roles={props.roles} />
                    </div>
                    <div className="rounded-2xl shadow-sm bg-white pt-2 pb-3">
                        <div className="rounded-2xl">
                            <Table roles={props.roles} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
