import * as Base from "@/js/components/switch";

export default function Switch({
    type = "primary",
    title,
    checked,
    handler,
    className = "",
    ...props
}) {
    return (
        <div className="block p-1">
            <label>{title}</label>
            <Base.PrimarySwitch
                checked={checked}
                handler={handler}
                {...props}
            />
        </div>
    );
}
