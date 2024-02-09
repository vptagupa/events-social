import { Link } from "@inertiajs/react";
import { topMenu } from "./constant";
import Logo from "@/assets/images/logo.png";

export default function Index({ children, props }) {
    return (
        <>
            <div className="bg-slate-100 text-slate-500 w-full h-screen">
                <div className="box-border border-0 border-green-900 w-full p-2 grid grid-cols-2">
                    <div className="flex items-center justify-start gap-x-2 box-border border-0 border-green-600">
                        <img src={Logo} className="h-8" />
                        {import.meta.env.VITE_APP_NAME}
                    </div>
                    <div className="box-border border-0 border-red-600 flex items-center justify-center">
                        <div className="m-2 p-4 w-full rounded-md bg-gradient-to-r from-rose-500 to-rose-600 text-white text-md">
                            <ol>
                                {topMenu.map((menu, idx) => (
                                    <li key={idx} className="float-left px-2">
                                        <Link href={menu.url}>
                                            {menu.title}
                                        </Link>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center box-border min-h-[500px] border-0 border-red-900 w-full p-2">
                    <div className="border-0 border-slate-700 w-full md:w-1/2">
                        {children}
                    </div>
                </div>
                <div className="box-border min-h-[200px] border-0 border-blue-900 w-full p-2">
                    Footer
                </div>
            </div>
        </>
    );
}
