export const ensureGroupRequiredRadios = (column, components) => {
    if (column.config?.is_options_required) {
        if (
            components.filter((c) => c.type == "radio" && c?.value == true)
                .length <= 0
        ) {
            column.error = "Please check at least any of the radio boxes.";
        }
    }

    return column?.error ? false : true;
};

export const ensureGroupRequired = (column, components) => {
    if ((column.config?.minimum_fields_required ?? 0) > 0) {
        if (
            components.filter((c) => c.value != "" && c?.value).length <
            column.config?.minimum_fields_required
        ) {
            column.error = `Require at least ${column.config?.minimum_fields_required} minimum of required fields.`;
        }
    }

    return column?.error ? false : true;
};

export const ensureConditionExpression = (component) => {
    if (component.config["condition.expression"]) {
        const expression = component.config["condition.expression"];
        const value = component.config["condition.value"];

        if (expression == "==") {
            if (component.value != value) {
                component.error =
                    "The value did not match the condition. It is not equal to " +
                    value +
                    ".";
            }
        } else if (expression == ">") {
            if (parseFloat(component.value) <= parseFloat(value)) {
                component.error =
                    "The value did not match the condition. It is not greater than to " +
                    value +
                    ".";
            }
        } else if (expression == ">=") {
            if (parseFloat(component.value) < parseFloat(value)) {
                component.error =
                    "The value did not match the condition. It is not greater than or equal to " +
                    value +
                    ".";
            }
        } else if (expression == "<") {
            if (parseFloat(component.value) >= parseFloat(value)) {
                component.error =
                    "The value did not match the condition. It is not less than to " +
                    value +
                    ".";
            }
        } else if (expression == "<=") {
            if (parseFloat(component.value) > parseFloat(value)) {
                component.error =
                    "The value did not match the condition. It is not less than or equal to " +
                    value +
                    ".";
            }
        } else if (expression == "!=") {
            if (component.value == value) {
                component.error =
                    "The value did not match the condition. It should not equal to " +
                    value +
                    ".";
            }
        }
    }

    return component?.error ? false : true;
};

export const ensureRequired = (component) => {
    if (
        component.config?.is_required == true &&
        (component?.value == null || component?.value == "")
    ) {
        component.error = message(component, "field is required.");
    }

    return component?.error ? false : true;
};

export const ensureBasic = (component) => {
    if (component.type == "input") {
        if (component?.properties?.type.toLowerCase() == "email") {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(component.value)) {
                component.error = message(
                    component,
                    "field is invalid email address format."
                );
            }
        } else if (component?.properties?.type.toLowerCase() == "number") {
            const regex = /[0-9]/;
            if (!regex.test(component.value)) {
                component.error = message(component, "field must be a number.");
            }
        }
    }

    return component?.error ? false : true;
};

function message(component, message) {
    return (
        (component.config?.name ? "The " : "This") +
        (component.config?.name ?? "") +
        " " +
        message
    );
}
