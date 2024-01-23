import { Input } from "@/js/components/form";

export default function Text({ title, value, onChange }) {
    return (
        <div className="block p-1">
            <label>{title}</label>
            <Input
                type="text"
                className="my-2"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
