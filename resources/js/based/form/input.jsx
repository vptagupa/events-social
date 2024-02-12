import { Input as Base } from "@/js/components/form";

export default function Input({
    type = "text",
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
                type={type}
                className={`mt-2 ${className}`}
                value={value}
                onChange={onChange}
                {...props}
            />
            {info && <span className="block text-end text-xs">{info}</span>}
            {error && (
                <span className="block text-danger text-xs mt-2">{error}</span>
            )}
        </div>
    );
}
