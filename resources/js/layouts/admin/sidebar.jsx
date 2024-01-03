import menu from "@/js/constants/menu";
import { usePage } from "@inertiajs/react";
import { canAccess } from "@/js/helpers/access";
import MenuNav from "./menunav";

export default () => {
    const { user } = usePage().props;
    const filteredAccessMenu = menu.filter((nav) =>
        canAccess(user, nav.permission)
    );
    return (
        <>
            <ul className="text-xs">
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
