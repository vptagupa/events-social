import { Checkbox } from "@/js/components/form";

export default function Check({ title, value, onChange }) {
    return (
        <div className="my-2 p-1 flex items-center">
            <label className="flex items-center gap-x-2">
                <Checkbox value={value} onChange={onChange} />
                {title}
            </label>
        </div>
    );
}
