import { Textarea as FormTextArea } from "@/js/components/form";

export default function Textarea({
    title,
    placeholder = "Type here",
    isRequired,
    ...props
}) {
    return (
        <div>
            {title && (
                <label className="block text-xs mb-1">
                    {title}{" "}
                    {isRequired ? <span className="text-danger">*</span> : ""}
                </label>
            )}
            <FormTextArea {...props} placeholder={placeholder} />
        </div>
    );
}
