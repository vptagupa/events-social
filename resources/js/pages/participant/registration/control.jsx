import { useState } from "react";
import {
    ensureGroupRequiredRadios,
    ensureGroupRequired,
    ensureConditionExpression,
    ensureRequired,
    ensureBasic,
} from "./validations";

export const useControl = () => {
    const [data, setData] = useState([]);
    const [other, setOther] = useState({ note: "" });

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

    const validateForm = (form) => {
        const griddable = (grids) => {
            let truth = true;
            for (let grid of grids) {
                for (let column of grid.columns) {
                    column.error = null;

                    let valid = componentable(column, column.components);
                    if (!valid) {
                        truth = false;
                    }
                    valid = [
                        ensureGroupRequiredRadios(column, column.components),
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
                    ensureConditionExpression(component),
                    ensureBasic(component),
                    ensureRequired(component),
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

    return {
        data,
        other,
        setData,
        setOther,
        handleChange,
        validateForm,
    };
};
