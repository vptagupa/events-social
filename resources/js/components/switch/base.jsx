import { Switch } from "@headlessui/react";

export default ({ enabled, setEnabled, colorActive, colorInActive }) => {
    return (
        <div>
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                    enabled ? colorActive : colorInActive
                }  inline-flex h-5 w-10 items-center rounded-full`}
            >
                <span className="sr-only">Enable notifications</span>
                <span
                    className={`${
                        enabled ? "translate-x-6" : "translate-x-1"
                    } inline-block h-3 w-3 transform rounded-full bg-white transition`}
                />
            </Switch>
        </div>
    );
};
