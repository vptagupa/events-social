import Text from "./config/text";
import Check from "./config/checkbox";
import Conditions from "./config/conditions";
import Select from "./config/select";
import Editor from "./config/editor";
import { Select as FormSelect } from "@/js/based/form";
import { conditions, config } from "../constants";

export default function Config({
    change,
    selectChange,
    selectAdd,
    selectRemove,
    value,
    changeProperty,
}) {
    const fullWidth = ["editor"];
    const components = {
        name: (value) => (
            <Text
                title={"Name"}
                value={value.config["name"] ?? ""}
                onChange={(e) => change("name", e.target.value)}
            />
        ),
        label: (value) => (
            <Text
                title={"label"}
                value={value.config["label"] ?? ""}
                onChange={(e) => change("label", e.target.value)}
            />
        ),
        class: (value) => (
            <Text
                title={"class"}
                value={value.config["class"] ?? ""}
                onChange={(e) => change("class", e.target.value)}
            />
        ),
        style: (value) => (
            <Text
                title={"Style"}
                value={value.config["style"] ?? ""}
                onChange={(e) => change("style", e.target.value)}
            />
        ),
        file_types: (value) =>
            value.config.form.includes("file types") && (
                <Text
                    title={"File types"}
                    label="E.g: pdf, jpg, jpeg, png, mp4"
                    value={value.config["file_types"] ?? ""}
                    onChange={(e) => change("file_types", e.target.value)}
                />
            ),
        next_button: (value) => (
            <Text
                title={"Next button title"}
                value={value.config["next.title"] ?? ""}
                onChange={(e) => change("next.title", e.target.value)}
            />
        ),
        prev_button: (value) => (
            <Text
                title={"Previous button title"}
                value={value.config["prev.title"] ?? ""}
                onChange={(e) => change("prev.title", e.target.value)}
            />
        ),
        condition: (value) => (
            <Conditions
                title="Condition"
                conditions={conditions}
                expression={value.config["condition.expression"] ?? ""}
                value={value.config["condition.value"] ?? ""}
                onChangeExpr={(val) => change("condition.expression", val)}
                onChangeValue={(val) => change("condition.value", val)}
            />
        ),
        placeholder: (value) => (
            <Text
                title={"Placeholder"}
                value={value.config["placeholder"] ?? ""}
                onChange={(e) => change("placeholder", e.target.value)}
            />
        ),
        default_value: (value) => (
            <Text
                title={"Default value"}
                value={value.config["defaultValue"] ?? ""}
                onChange={(e) => change("defaultValue", e.target.value)}
            />
        ),
        is_required: (value) => (
            <Check
                title=" Is required"
                value={value.config["is_required"] ?? ""}
                checked={value.config["is_required"] ?? false}
                onChange={(e) => change("is_required", e.target.checked)}
            />
        ),
        is_options_required: (value) => (
            <Check
                title=" Is options required"
                value={value.config["is_options_required"] ?? ""}
                checked={value.config["is_options_required"] ?? false}
                onChange={(e) =>
                    change("is_options_required", e.target.checked)
                }
            />
        ),
        is_number: (value) =>
            ["input"].includes(value.type) && (
                <Check
                    title=" Is Number"
                    value={value.config["is_number"] ?? ""}
                    checked={value.config["is_number"] ?? false}
                    onChange={(e) => change("is_number", e.target.checked)}
                />
            ),
        minimum_fields_required_as_number: (value) => (
            <Text
                type="number"
                title="Group of fields require a minimum number of required fields."
                value={value.config["minimum_fields_required"] ?? ""}
                onChange={(e) =>
                    change("minimum_fields_required", e.target.value)
                }
            />
        ),

        select: (value) => {
            if (value.type == "select")
                return (
                    <Select
                        title={"Options"}
                        change={(option, name, value) =>
                            selectChange(option, name, value)
                        }
                        add={(value, text) => selectAdd(value, text)}
                        remove={(option) => selectRemove(option)}
                        options={value.config["options"] ?? []}
                    />
                );
        },
        title: (value) => (
            <Text
                title={"Title"}
                value={value.config["title"] ?? ""}
                onChange={(e) => change("title", e.target.value)}
            />
        ),
        editor: (value) => (
            <Editor
                title={"Editor"}
                value={value.config["content"] ?? ""}
                onChange={(content) => change("content", content)}
            />
        ),
        is_searchable: (value) => (
            <Check
                title=" Is Searchable"
                value={value.config["is_searchable"] ?? ""}
                checked={value.config["is_searchable"] ?? false}
                onChange={(e) => change("is_searchable", e.target.checked)}
            />
        ),
    };

    const componentable = (forms, value) => {
        return forms
            .map((form) => {
                const Component = components[form.replace(/\s+/g, "_")](value);
                if (Component) {
                    return Component;
                }
                return null;
            })
            .filter((f) => f)
            .map((component, idx) => <div key={idx}>{component}</div>);
    };

    const Properties = ({ value }) => {
        return (
            <FormSelect
                title="Types"
                value={value?.properties?.type ?? ""}
                onChange={(e) => changeProperty("type", e.target.value)}
            >
                {value.properties.types.map((type, idx) => (
                    <option key={idx} value={type}>
                        {type}
                    </option>
                ))}
            </FormSelect>
        );
    };

    return (
        <div>
            <div className="block text-center font-bold text-lg mb-10 mt-10">
                {value.title}
            </div>
            <div className={`grid grid-cols-2 gap-3 text-xs`}>
                {componentable(
                    value.config.form.filter(
                        (form) => !fullWidth.includes(form)
                    ),
                    value
                )}

                {value?.properties?.types.length > 0 && (
                    <Properties value={value} />
                )}
            </div>
            <div className={`grid grid-cols-1  text-xs`}>
                {componentable(
                    value.config.form.filter((form) =>
                        fullWidth.includes(form)
                    ),
                    value
                )}
            </div>
        </div>
    );
}
