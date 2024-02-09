import { Input, Select, Textarea, Check } from "@/js/based/form";
import { ControlContext } from "../context";
import { useContext } from "react";

export default function Component({ value }) {
    const control = useContext(ControlContext);

    let props = {
        title: value.config.name,
        placeholder: value.config?.placeholder ?? "Enter text here",
        value: value.config?.defaultValue ?? "",
        error: value?.error,
    };

    if (value?.value) {
        props = {
            ...props,
            value: value.value,
        };
    }

    if (value.type == "text") {
        return (
            <Input
                {...props}
                onChange={(e) => control.handleChange(value, e.target.value)}
            />
        );
    } else if (value.type == "select") {
        return (
            <Select
                {...props}
                onChange={(e) => control.handleChange(value, e.target.value)}
            >
                {value.config.options.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </Select>
        );
    } else if (value.type == "textarea") {
        return (
            <Textarea
                {...props}
                onChange={(e) => control.handleChange(value, e.target.value)}
            />
        );
    } else if (value.type == "checkbox") {
        return (
            <Check
                {...props}
                checked={value?.value ?? false}
                onChange={(e) => control.handleChange(value, e.target.checked)}
            />
        );
    } else if (value.type == "radio") {
        return (
            <Check
                {...props}
                checked={value?.value ?? false}
                onChange={(e) => control.handleChange(value, e.target.checked)}
            />
        );
    }
}
