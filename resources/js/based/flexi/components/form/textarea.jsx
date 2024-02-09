import { Textarea as FormTextArea } from "@/js/components/form";

export default function Textarea({ placeholder = "Type here", ...props }) {
    return <FormTextArea {...props} placeholder={placeholder} />;
}
