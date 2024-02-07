import { Checkbox } from "@/js/components/form";

export default function Check({ title, error, ...props }) {
    return (
        <div className="block p-1">
            <label className="flex items-center space-x-1 cursor-pointer">
                <Checkbox {...props} />
                <span>{title}</span>
            </label>
            {error && (
                <span className="block text-danger text-xs">{error}</span>
            )}
        </div>
    );
}
