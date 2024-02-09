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
        let valid = true;

        const griddable = (grids) => {
            for (let grid of grids) {
                for (let column of grid.columns) {
                    componentable(column.components);
                }
            }
        };

        const componentable = (components) => {
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
        };

        griddable(form.grids);

        setData([...data]);

        return valid;
    };

    return { data, tab, next, prev, isFinal, hasPrev, submit, handleChange };
};
