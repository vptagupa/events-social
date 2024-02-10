import { useState, useCallback } from "react";

export const useControl = (flexis) => {
    const [data, setData] = useState(flexis);
    const [tab, setTab] = useState(0);

    const next = useCallback(
        (form) => {
            if (validateForm(form))
                if (tab < flexis.length - 1) setTab(tab + 1);
        },
        [tab]
    );

    const prev = useCallback(
        (form) => {
            if (tab > 0) setTab(tab - 1);
        },
        [tab]
    );

    const isFinal = useCallback(() => tab >= flexis.length - 1, [tab]);

    const hasPrev = useCallback(() => tab > 0, [tab]);

    const handleChange = (column, component, value) => {
        // Change all radio value to false in favor for the selected radio
        if (component.type == "radio") {
            column.components
                .filter((c) => c.type == "radio")
                .map((c) => {
                    c.value = false;
                    return c;
                });
        }

        component.value = value;

        setData([...data]);
    };

    const submit = (form) => {
        if (validateForm(form)) {
            console.log("submit!");
        }
    };

    const validateForm = (form) => {
        const ensureRequiredRadios = (_valid, column, components) => {
            let valid = _valid;

            // Tag the column as error when any of the required radios are unchecked
            let requiredRadios = components.filter(
                (c) => c.type == "radio" && c.config?.is_required == true
            );

            let requiredNotRadios = components.filter(
                (c) =>
                    c.type != "radio" &&
                    c.config?.is_required == true &&
                    c?.error
            );

            // Ensure to check the validations of multiple radios after when all the other components are valid
            if (
                !valid &&
                requiredRadios.length > 1 &&
                requiredNotRadios.length <= 0
            ) {
                const checkedRequiredRadios = requiredRadios.filter(
                    (c) => !c?.error
                );

                if (checkedRequiredRadios.length <= 0) {
                    column.error =
                        "Please check at least one (1) of any of the radio boxes.";
                }
                requiredRadios.map((component) => {
                    component.error = null;
                    return component;
                });

                // ensure that the valid var is always false when the radios have no check
                valid = column?.error ? false : true;
            }

            return valid;
        };

        const ensureGroupRequired = (column, components) => {
            if ((column.config?.minimum_fields_required ?? 0) > 0) {
                if (
                    components.filter((c) => c.value != "" && c?.value).length <
                    column.config?.minimum_fields_required
                ) {
                    column.error = `Require at least ${column.config?.minimum_fields_required} minimum of required fields.`;
                    return false;
                }
            }

            return true;
        };

        const ensureConditionExpression = (component) => {
            let valid = true;
            if (component.config["condition.expression"]) {
                const expression = component.config["condition.expression"];
                const value = component.config["condition.value"];

                if (expression == "==") {
                    if (component.value != value) {
                        valid = false;
                        component.error =
                            "The value did not match the condition. It is not equal to " +
                            value +
                            ".";
                    }
                } else if (expression == ">") {
                    if (parseFloat(component.value) <= parseFloat(value)) {
                        valid = false;
                        component.error =
                            "The value did not match the condition. It is not greater than to " +
                            value +
                            ".";
                    }
                } else if (expression == ">=") {
                    if (parseFloat(component.value) < parseFloat(value)) {
                        valid = false;
                        component.error =
                            "The value did not match the condition. It is not greater than or equal to " +
                            value +
                            ".";
                    }
                } else if (expression == "<") {
                    if (parseFloat(component.value) >= parseFloat(value)) {
                        valid = false;
                        component.error =
                            "The value did not match the condition. It is not less than to " +
                            value +
                            ".";
                    }
                } else if (expression == "<=") {
                    if (parseFloat(component.value) > parseFloat(value)) {
                        valid = false;
                        component.error =
                            "The value did not match the condition. It is not less than or equal to " +
                            value +
                            ".";
                    }
                } else if (expression == "!=") {
                    if (component.value == value) {
                        valid = false;
                        component.error =
                            "The value did not match the condition. It should not equal to " +
                            value +
                            ".";
                    }
                }
            }

            return valid;
        };

        const ensureRequired = (component) => {
            let valid = true;
            component.error = null;
            if (
                component.config?.is_required == true &&
                (component?.value == null || component?.value == "")
            ) {
                valid = false;
                component.error =
                    (component.config?.name ? "The " : "This") +
                    (component.config?.name ?? "") +
                    " field is required.";
            }

            return valid;
        };

        const griddable = (grids) => {
            let truth = true;
            for (let grid of grids) {
                for (let column of grid.columns) {
                    column.error = null;
                    let valid = componentable(column, column.components);
                    valid = [
                        ensureRequiredRadios(valid, column, column.components),
                        ensureGroupRequired(column, column.components),
                    ];
                    for (let v of valid) {
                        if (!v) {
                            truth = false;
                        }
                    }
                }
            }

            return truth;
        };

        const componentable = (column, components) => {
            let truth = true;

            for (let component of components) {
                component.error = null;
                if (component.type == "grid") {
                    return griddable(component.grids);
                }

                const valid = [
                    ensureRequired(component),
                    ensureConditionExpression(component),
                ];

                for (let v of valid) {
                    if (!v) {
                        truth = false;
                    }
                }
            }

            return truth;
        };

        let valid = griddable(form.grids);

        setData([...data]);

        return valid;
    };

    return { data, tab, next, prev, isFinal, hasPrev, submit, handleChange };
};
