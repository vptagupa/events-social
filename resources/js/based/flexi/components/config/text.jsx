import { Input } from "@/js/components/form";

export default function Text({ type = "text", title, label, value, onChange }) {
    return (
        <div className="block p-1">
            <label>
                {title} {label ? <span className="text-xs">{label}</span> : ""}
            </label>
            <Input
                type={type}
                className="my-2"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
