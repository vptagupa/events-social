import { Switch } from "@headlessui/react";

export default function Component({
    checked,
    handler,
    active,
    inActive,
    className = "bg-white",
    posOn = "translate-x-6",
    posOff = "translate-x-1",
    size = "h-5 w-10",
    classSwitch = "h-3 w-3 bg-white",
    ...props
}) {
    return (
        <Switch
            checked={checked}
            onChange={handler}
            className={`${
                checked ? active : inActive
            } inline-flex items-center rounded-full ${className} ${size}`}
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
