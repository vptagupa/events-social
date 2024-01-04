import Layout from "./public";
import Logo from "@/assets/images/logo.png";

export default function Index(props) {
    return (
        <Layout>
            <div className="h-screen w-screen  text-slate-500 flex items-center justify-center bg-gradient-to-l from-indigo-400 via-indigo-300 to-purple-400 from-50% via-20% to-30%">
                <div className="bg-white p-4 rounded-2xl xs:w-4/6 md:w-1/4">
                    <div className="flex flex-col space-y-6 text-center mb-10 mt-2">
                        <span>
                            <img className="h-[4rem] inline" src={Logo} />
                        </span>
                        <span className="text-3xl font-bold">LaReact</span>
                    </div>
                    <div>{props.children}</div>
                </div>
            </div>
        </Layout>
    );
}
