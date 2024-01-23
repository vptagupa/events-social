import { Link } from "@inertiajs/react";
import { menus } from "./config";
export default function Sidebar({ event }) {
    return (
        <>
            <ol>
                {menus.map((menu, idx) => (
                    <li key={idx} className="cursor-pointer">
                        <Link href={menu.url(event.id)}>{menu.icon}</Link>
                    </li>
                ))}
            </ol>
        </>
    );
}
