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
        <div>
            <div className="block text-center font-bold text-lg mb-10">
                {value.title}
            </div>
            <div className={`flex gap-3 text-xs`}>
                <div>
                    {value.config.form.includes("name") && (
                        <Text
                            title={"Name"}
                            value={value.config["name"] ?? ""}
                            onChange={(e) => change("name", e.target.value)}
                        />
                    )}
                    {value.config.form.includes("label") && (
                        <Text
                            title={"label"}
                            value={value.config["label"] ?? ""}
                            onChange={(e) => change("label", e.target.value)}
                        />
                    )}
                    {value.config.form.includes("class") && (
                        <Text
                            title={"class"}
                            value={value.config["class"] ?? ""}
                            onChange={(e) => change("class", e.target.value)}
                        />
                    )}

                    {value.config.form.includes("style") && (
                        <Text
                            title={"Style"}
                            value={value.config["style"] ?? ""}
                            onChange={(e) => change("style", e.target.value)}
                        />
                    )}
                    {value.config.form.includes("next button") && (
                        <Text
                            title={"Next Button Title"}
                            value={value.config["next.title"] ?? ""}
                            onChange={(e) =>
                                change("next.title", e.target.value)
                            }
                        />
                    )}
                    {value.config.form.includes("prev button") && (
                        <Text
                            title={"Previous Button Title"}
                            value={value.config["prev.title"] ?? ""}
                            onChange={(e) =>
                                change("prev.title", e.target.value)
                            }
                        />
                    )}
                </div>
                <div className="">
                    {value.config.form.includes("condition") && (
                        <Conditions
                            title="Condition"
                            conditions={conditions}
                            expression={
                                value.config["condition.expression"] ?? ""
                            }
                            value={value.config["condition.value"] ?? ""}
                            onChangeExpr={(val) =>
                                change("condition.expression", val)
                            }
                            onChangeValue={(val) =>
                                change("condition.value", val)
                            }
                        />
                    )}
                    {value.config.form.includes("placeholder") && (
                        <Text
                            title={"Placeholder"}
                            value={value.config["placeholder"] ?? ""}
                            onChange={(e) =>
                                change("placeholder", e.target.value)
                            }
                        />
                    )}
                    {value.config.form.includes("default value") && (
                        <Text
                            title={"Default Value"}
                            value={value.config["defaultValue"] ?? ""}
                            onChange={(e) =>
                                change("defaultValue", e.target.value)
                            }
                        />
                    )}

                    {value.config.form.includes("is required") && (
                        <Check
                            title=" Is Required"
                            value={value.config["is_required"] ?? ""}
                            checked={value.config["is_required"] ?? false}
                            onChange={(e) =>
                                change("is_required", e.target.checked)
                            }
                        />
                    )}
                </div>
                {value.config.form.includes("select") &&
                    value.type == "select" && (
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
        </div>
    );
}
