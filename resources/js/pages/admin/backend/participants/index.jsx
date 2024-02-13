import Layout from "@/js/layouts/admin";
import Table from "./components/table";

export default function Users(props) {
    return (
        <>
            <Layout>
                <div className="xs:p-2 md:px-4">
                    <div className="font-bold text-lg">Participants</div>
                    <div className="rounded-2xl shadow-sm bg-white pt-2 pb-3">
                        <div className="rounded-2xl">
                            <Table />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
