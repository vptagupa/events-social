import { Switch } from "@headlessui/react";

export default function Component({
    checked,
    handler,
    active,
    inActive,
    className = "",
    posOn = "translate-x-5",
    posOff = "translate-x-1",
    size = "h-4 w-8",
    classSwitch = "h-2 w-2 bg-white",
    ...props
}) {
    return (
        <Switch
            checked={checked}
            onChange={handler}
            className={`${
                checked ? active : inActive
            } inline-flex items-center rounded-full outline-none ${className} ${size}`}
            {...props}
        >
            <span className="sr-only">Switch action</span>
            <span
                className={`${
                    checked ? posOn : posOff
                } inline-block transform rounded-full transition ${classSwitch}`}
            />
        </Switch>
    );
}
