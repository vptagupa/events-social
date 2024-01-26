import Text from "./config/text";
import Check from "./config/checkbox";
import Conditions from "./config/conditions";
import Select from "./config/select";
import { conditions } from "../constants";

export default function Config({
    change,
    selectChange,
    selectAdd,
    selectRemove,
    value,
}) {
    return (
        <div className={`flex gap-3 text-xs`}>
            <div>
                <Text
                    title={"Name"}
                    value={value.config["name"] ?? ""}
                    onChange={(e) => change("name", e.target.value)}
                />

                <Text
                    title={"Label"}
                    value={value.config["label"] ?? ""}
                    onChange={(e) => change("label", e.target.value)}
                />

                <Text
                    title={"Class"}
                    value={value.config["class"] ?? ""}
                    onChange={(e) => change("class", e.target.value)}
                />
                <Text
                    title={"Style"}
                    value={value.config["style"] ?? ""}
                    onChange={(e) => change("style", e.target.value)}
                />
            </div>
            <div className="">
                <Conditions
                    title="Condition"
                    conditions={conditions}
                    expression={value.config["condition.expression"] ?? ""}
                    value={value.config["condition.value"] ?? ""}
                    onChangeExpr={(val) => change("condition.expression", val)}
                    onChangeValue={(val) => change("condition.value", val)}
                />

                <Text
                    title={"Placeholder"}
                    value={value.config["placeholder"] ?? ""}
                    onChange={(e) => change("placeholder", e.target.value)}
                />
                <Text
                    title={"Default Value"}
                    value={value.config["defaultValue"] ?? ""}
                    onChange={(e) => change("defaultValue", e.target.value)}
                />
                <Check
                    title=" Is Required"
                    value={value.config["is_required"] ?? ""}
                    checked={value.config["is_required"] ?? false}
                    onChange={(e) => change("is_required", e.target.checked)}
                />
            </div>
            {value.type == "select" && (
                <Select
                    title={"Options"}
                    change={(option, name, value) =>
                        selectChange(option, name, value)
                    }
                    add={(value, text) => selectAdd(value, text)}
                    remove={(option) => selectRemove(option)}
                    options={value.config["options"] ?? []}
                />
            )}
        </div>
    );
}
