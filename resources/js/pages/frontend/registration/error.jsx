import Layout from "@/js/layouts/public";
import { Suspense } from "react";
import Fallback from "@/js/based/fallback";

export default function Error({ message }) {
    return (
        <>
            <Layout>
                <div className="text-4xl p-4">{message}</div>
            </Layout>
        </>
    );
}
