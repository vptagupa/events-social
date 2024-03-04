import { Checkbox } from "@/js/components/form";

export default function Contract({
    checked = false,
    title = "Contract Title",
    isRequired,
    onChange,
    ...props
}) {
    return (
        <div className="flex items-center gap-x-2">
            <Checkbox checked={checked} onChange={onChange} />
            <span className="text-blue-500 underline">
                {title}{" "}
                {isRequired ? <span className="text-danger">*</span> : ""}
            </span>
        </div>
    );
}
