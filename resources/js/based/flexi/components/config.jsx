import Text from "./config/text";
import Check from "./config/checkbox";
import Conditions from "./config/conditions";
import Select from "./config/select";
import { useState } from "react";

const conditions = [
    {
        title: "Equal",
        expression: "==",
    },
    {
        title: "Not equal",
        expression: "!=",
    },
    {
        title: "Greater than",
        expression: ">",
    },
    {
        title: "Greater than and equal",
        expression: ">=",
    },
    {
        title: "Less than",
        expression: "<",
    },
    {
        title: "Less than and equal",
        expression: "<=",
    },
];

export default function Config({
    change,
    selectChange,
    selectAdd,
    selectRemove,
    value,
}) {
    const [options, setOptions] = useState([]);
    return (
        <div
            className={`grid ${
                value.type == "select" ? "grid-cols-3" : "grid-cols-2"
            } gap-3 text-xs`}
        >
            <div>
                <Text
                    title={"Name"}
                    value={value.config["name"] ?? ""}
                    onChange={(e) => change(value, "name", e.target.value)}
                />

                <Text
                    title={"Label"}
                    value={value.config["label"] ?? ""}
                    onChange={(e) => change(value, "label", e.target.value)}
                />

                <Text
                    title={"Class"}
                    value={value.config["class"] ?? ""}
                    onChange={(e) => change(value, "class", e.target.value)}
                />
                <Text
                    title={"Style"}
                    value={value.config["style"] ?? ""}
                    onChange={(e) => change(value, "style", e.target.value)}
                />
            </div>
            <div className="">
                <Conditions
                    title="Condition"
                    conditions={conditions}
                    expression={value.config["condition.expression"] ?? ""}
                    value={value.config["condition.value"] ?? ""}
                    onChangeExpr={(val) =>
                        change(value, "condition.expression", val)
                    }
                    onChangeValue={(val) =>
                        change(value, "condition.value", val)
                    }
                />

                <Text
                    title={"Placeholder"}
                    value={value.config["placeholder"] ?? ""}
                    onChange={(e) =>
                        change(value, "placeholder", e.target.value)
                    }
                />
                <Text
                    title={"Default Value"}
                    value={value.config["defaultValue"] ?? ""}
                    onChange={(e) =>
                        change(value, "defaultValue", e.target.value)
                    }
                />
                <Check
                    title=" Is Required"
                    value={value.config["is_required"] ?? ""}
                    checked={value.config["is_required"] ?? false}
                    onChange={(e) =>
                        change(value, "is_required", e.target.checked)
                    }
                />
            </div>
            {value.type == "select" && (
                <Select
                    title={"Options"}
                    change={(option, name, val) =>
                        selectChange(value, option, name, val)
                    }
                    add={(val, text) => selectAdd(value, val, text)}
                    remove={(option) => selectRemove(value, option)}
                    options={value.config["options"] ?? []}
                />
            )}
        </div>
    );
}
