import { Input } from "@/js/components/form";

export default function Text({ placeholder = "Type here", ...props }) {
    return <Input type="text" {...props} placeholder={placeholder} />;
}
