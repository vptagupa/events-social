import menu from "@/js/constants/menu";
import { usePage } from "@inertiajs/react";
import { canAccess } from "@/js/helpers/access";
import MenuNav from "./menu";

export default () => {
    const { user } = usePage().props;
    const filteredAccessMenu = menu.filter((nav) =>
        canAccess(user, nav.permission)
    );
    return (
        <>
            <ul className="text-sm">
                {filteredAccessMenu.map((nav, i) => {
                    return (
                        <li key={i} className={""}>
                            <MenuNav nav={nav} />
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
