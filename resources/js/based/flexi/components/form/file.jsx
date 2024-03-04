import { Input } from "@/js/components/form";

export default function Text({ title, iRequired, ...props }) {
    return (
        <div>
            {title && (
                <label className="block text-xs mb-1">
                    {title}{" "}
                    {isRequired ? <span className="text-danger">*</span> : ""}
                </label>
            )}
            <Input type="file" {...props} placeholder="Type here" />
        </div>
    );
}
