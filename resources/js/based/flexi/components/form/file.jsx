import { Input } from "@/js/components/form";

export default function Text({ title, ...props }) {
    return (
        <div>
            {title && <label className="block text-xs mb-1">{title}</label>}
            <Input type="file" {...props} placeholder="Type here" />
        </div>
    );
}
