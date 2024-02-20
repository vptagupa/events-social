import Layout from "@/js/layouts/public";
import { Suspense } from "react";
import Fallback from "@/js/based/fallback";

export default function Error({ message }) {
    return (
        <>
            <Layout>
                <div className="w-full min-h-[500px] flex items-center justify-center transition-all ease-in-out delay-75 duration-150">
                    <div className="text-4xl text-center p-4 w-full md:w-1/2">
                        {message}
                    </div>
                </div>
            </Layout>
        </>
    );
}
