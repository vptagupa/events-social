import { Input } from "@/js/components/form";

export default function Text({ placeholder = "Type here", title, ...props }) {
    return (
        <div className="">
            {title && <label className="block text-xs mb-1">{title}</label>}
            <Input type="text" {...props} placeholder={placeholder} />
        </div>
    );
}
