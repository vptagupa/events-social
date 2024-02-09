import { Input, Select, Textarea } from "@/js/based/form";

export default function Component({ value }) {
    console.log(value);
    const props = {
        title: value.config.name,
        placeholder: value.config?.placeholder ?? "Enter text here",
        defaultValue: value.config?.defaultValue ?? "",
    };
    if (value.type == "text") {
        return <Input {...props} />;
    } else if (value.type == "select") {
        return <Select {...props} />;
    } else if (value.type == "textarea") {
        return <Textarea {...props} />;
    }
}
