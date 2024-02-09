import {
    Input,
    Select,
    Textarea,
    Check,
    File,
    Radio,
    Label,
    Notes,
    Heading,
} from "@/js/based/form";
import { ControlContext } from "../context";
import { useContext } from "react";

export default function Component({ value }) {
    const control = useContext(ControlContext);

    let props = {
        title: value.config.name,
        placeholder: value.config?.placeholder ?? "Enter text here",
        value: value.config?.defaultValue ?? "",
        error: value?.error,
        className: value.config?.class ?? "",
        // style: value.config?.style ?? "",
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
                type={value.config?.is_number ? "number" : "text"}
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
            <Radio
                {...props}
                checked={value?.value ?? false}
                onChange={(e) => control.handleChange(value, e.target.checked)}
            />
        );
    } else if (value.type == "file") {
        return (
            <File
                {...props}
                accept={(value.config?.file_types ?? "")
                    .split(",")
                    .map((type) => (type[0] == "." ? type : "." + type))
                    .join(",")}
                label={
                    "Acceptable format: " + value.config?.file_types ??
                    "any files"
                }
                remove={(e) => control.handleChange(value, null)}
                onChange={(file) => control.handleChange(value, file)}
            />
        );
    } else if (value.type == "label") {
        return <Label value={props.value} />;
    } else if (value.type == "notes") {
        return (
            <Notes
                className={props.className}
                value={props.value}
                type={value.config?.properties?.type}
            />
        );
    } else if (value.type == "heading") {
        return (
            <Heading
                className={props.className}
                value={props.value}
                type={value.config?.properties?.type}
            />
        );
    }
}
