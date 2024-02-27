import { Select as Base } from "@/js/components/form";

export default function Input({
    type = "text",
    title,
    value,
    onChange,
    className = "",
    isRequired = false,
    error,
    ...props
}) {
    return (
        <div className="block p-1">
            <label>
                {title}{" "}
                {isRequired ? <span className="text-danger">*</span> : ""}
            </label>
            <Base
                className={`my-2 ${className}`}
                value={value}
                onChange={onChange}
                {...props}
            />
            {error && (
                <span className="block text-danger text-xs">{error}</span>
            )}
        </div>
    );
}
