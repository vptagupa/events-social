import { Textarea as FormTextArea } from "@/js/components/form";

export default function Textarea({
    title,
    placeholder = "Type here",
    ...props
}) {
    return (
        <div>
            {title && <label className="block text-xs mb-1">{title}</label>}
            <FormTextArea {...props} placeholder={placeholder} />
        </div>
    );
}
