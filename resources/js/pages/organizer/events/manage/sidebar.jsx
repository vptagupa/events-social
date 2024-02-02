import { Link } from "@inertiajs/react";
import { menus } from "./constants";
export default function Sidebar({ event }) {
    return (
        <>
            <ol>
                {menus.map((menu, idx) => (
                    <li key={idx} className="cursor-pointer text-center p-1">
                        <Link
                            href={menu.url(event.id)}
                            className="flex gap-x-1 w-full items-center justify-center group"
                        >
                            {menu.icon}
                            <span className="relative flex items-center group-hover:visible transition-all ease-in-out duration-75 invisible">
                                <span className="w-32 absolute text-start ml-2">
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
