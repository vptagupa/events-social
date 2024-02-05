import { Link } from "@inertiajs/react";
import { menus } from "./constants";
export default function Sidebar({ event }) {
    return (
        <>
            <ol className="p-3 bg-slate-200 rounded-md">
                {menus.map((menu, idx) => (
                    <li key={idx} className="cursor-pointer text-center p-1">
                        <Link
                            href={menu.url(event.organizer_id, event.id)}
                            className="flex gap-x-1 w-full items-center justify-center group"
                        >
                            {menu.icon}
                            <span className="relative flex items-center invisible group-hover:visible transition-all ease-in-out duration-75">
                                <span className="w-40 py-2 rounded-tr-md rounded-br-md ml-1 bg-slate-200 absolute text-start pl-4">
                                    {menu.title}
                                </span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ol>
        </>
    );
}
