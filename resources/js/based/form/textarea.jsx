import { Textarea as Base } from "@/js/components/form";

export default function Textarea({
    title,
    value,
    onChange,
    className = "",
    info,
    error,
    ...props
}) {
    return (
        <div className="block p-1">
            <label>{title}</label>
            <Base
                className={`mt-2 ${className}`}
                value={value}
                onChange={onChange}
                {...props}
            />
            {error && (
                <span className="block text-danger text-xs">{error}</span>
            )}
            {info && <span className="block text-end text-xs">{info}</span>}
        </div>
    );
}
