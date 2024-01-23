import Layout from "@/js/layouts/admin";
import Sidebar from "../sidebar";
import Flexi from "@/js/based/flexi";

export default function RegistrationForm({ event }) {
    return (
        <Layout>
            <div className="">
                <div className="font-bold text-lg">Manage Event</div>
                <div className="flex rounded-2xl shadow-sm bg-white pt-2 pb-3">
                    <div className="w-12">
                        <Sidebar event={event} />
                    </div>
                    <div className="grow">
                        <Flexi />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
