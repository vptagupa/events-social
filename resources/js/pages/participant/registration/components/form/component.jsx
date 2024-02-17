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
import { ControlContext } from "../../context";
import { useContext } from "react";

export default function Component({ value, column }) {
    const context = useContext(ControlContext);

    const name = () => {
        if (value.type != "radio") {
            return (
                column.column +
                "_" +
                (value.config?.name
                    ? value.config?.name.replace(/\s+/g, "_")
                    : value.id)
            );
        }

        return column.column;
    };

    let props = {
        title: value.config.name,
        placeholder: value.config?.placeholder ?? "Type here",
        value: value?.value ?? value.config?.defaultValue ?? "",
        error: value?.error,
        className: value.config?.class ?? "",
        name: name(),
    };

    if (value?.value) {
        props = {
            ...props,
            value: value.value,
        };
    }

    const handleChange = (component, value) =>
        context.control.handleChange(column, component, value);

    const components = {
        input: (value) => (
            <Input
                {...props}
                type={value?.properties?.type}
                onChange={(e) => handleChange(value, e.target.value)}
            />
        ),
        select: (value) => (
            <Select
                {...props}
                onChange={(e) => handleChange(value, e.target.value)}
            >
                {value.config.options.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </Select>
        ),
        textarea: (value) => (
            <Textarea
                {...props}
                onChange={(e) => handleChange(value, e.target.value)}
            />
        ),
        checkbox: (value) => (
            <Check
                {...props}
                checked={value?.value ?? false}
                onChange={(e) => handleChange(value, e.target.checked)}
            />
        ),
        radio: (value) => (
            <Radio
                {...props}
                checked={value?.value ?? false}
                onChange={(e) => handleChange(value, e.target.checked)}
            />
        ),
        file: (value) => (
            <File
                {...props}
                accept={(value.config?.file_types ?? "")
                    .split(",")
                    .map((type) => (type[0] == "." ? type : "." + type))
                    .join(",")}
                label={
                    "Acceptable format: " +
                    (value.config?.file_types ?? "any files")
                }
                remove={(e) => handleChange(value, null)}
                onChange={(file) => handleChange(value, file)}
            />
        ),
        label: (value) => <Label value={props.value} />,
        notes: (value) => (
            <Notes
                className={props.className}
                value={props.value}
                type={value?.properties?.type}
            />
        ),
        heading: (value) => (
            <Heading
                className={props.className}
                value={props.value}
                type={value?.properties?.type}
            />
        ),
    };

    return components[value.type](value);
}
