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

    const handleChange = (component, value) => {
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

        const griddable = (grids) => {
            let truth = true;
            for (let grid of grids) {
                for (let column of grid.columns) {
                    let valid = componentable(column, column.components);
                    valid = [
                        ensureRequiredRadios(valid, column, column.components),
                    ];
                    for (var v of valid) {
                        if (!v) {
                            truth = false;
                        }
                    }
                }
            }

            return truth;
        };

        const componentable = (column, components) => {
            let valid = true;
            column.error = null;
            for (let component of components) {
                if (component.type == "grid") {
                    return griddable(component.grids);
                }

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
            }

            return valid;
        };

        let valid = griddable(form.grids);

        setData([...data]);

        return valid;
    };

    return { data, tab, next, prev, isFinal, hasPrev, submit, handleChange };
};
