import { Checkbox as Check } from "@/js/components/form";

export default function Checkbox({ title, value, onChange, ...props }) {
    return (
        <div className="my-2 p-1 flex items-center">
            <label className="flex items-center gap-x-2">
                <Check value={value} onChange={onChange} {...props} />
                {title}
            </label>
        </div>
    );
}
