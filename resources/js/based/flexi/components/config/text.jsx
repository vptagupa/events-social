import { Input } from "@/js/components/form";

export default function Text({ title, label, value, onChange }) {
    return (
        <div className="block p-1">
            <label>
                {title} {label ? <span className="text-xs">{label}</span> : ""}
            </label>
            <Input
                type="text"
                className="my-2"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
