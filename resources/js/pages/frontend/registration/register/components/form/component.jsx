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
    Contract,
} from "@/js/based/form";
import { ControlContext } from "../../context";
import { useContext } from "react";

export default function Component({ value, column }) {
    const control = useContext(ControlContext);

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
        control.handleChange(column, component, value);

    const components = {
        input: (value) => (
            <Input
                {...props}
                isRequired={value?.config?.is_required ?? false}
                className={` ${
                    value?.config?.className ?? ""
                } !text-lg transition-[border-bottom] ease-in-out delay-100 duration-700 !p-0 !mt-8 !rounded-none !border-t-0 !border-l-0 !border-r-0 border-b-2 !ring-0 focus:!outline-none
                    ${props?.error ? "border-red-300" : "border-slate-200"}
                    focus:border-blue-300
                `}
                type={value?.properties?.type}
                onChange={(e) => handleChange(value, e.target.value)}
                error={null}
            />
        ),
        select: (value) => (
            <Select
                {...props}
                isRequired={value?.config?.is_required ?? false}
                className={` ${
                    value?.config?.className ?? ""
                } !text-lg border-b-2 ${
                    props?.error ? "border-red-300" : "border-slate-200"
                }`}
                onChange={(e) => handleChange(value, e.target.value)}
                error={null}
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
                isRequired={value?.config?.is_required ?? false}
                className={` ${value?.config?.className ?? ""} !text-lg ${
                    props?.error ? "border-red-300" : "border-slate-200"
                }`}
                error={null}
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
                valye={value?.value}
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
        contract: (value) => (
            <Contract
                {...props}
                isRequired={value?.config?.is_required ?? false}
                checked={value?.value ?? false}
                title={value.config?.name ?? ""}
                content={value.config?.content ?? ""}
                onAgree={(agree) => handleChange(value, agree)}
                error={null}
                className={props?.error ? "decoration-red-300" : ""}
            />
        ),
    };

    return components[value.type](value);
}
