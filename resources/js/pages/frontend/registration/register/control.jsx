import { useState, useCallback } from "react";
import {
    ensureGroupRequiredRadios,
    ensureGroupRequired,
    ensureConditionExpression,
    ensureRequired,
    ensureBasic,
} from "./validations";

export const useControl = ({ flexis, onNext, onPrev, onSubmit }) => {
    const [data, setData] = useState(flexis);
    const [tab, setTab] = useState(0);
    const [processing, setProcessing] = useState(false);

    const next = useCallback(
        (form) => {
            if (validateForm(form) && hasNext()) {
                setTab(tab + 1);
                if (onNext) onNext(form);
                return true;
            }
        },
        [tab]
    );

    const prev = useCallback(
        (form) => {
            if (hasPrev()) {
                setTab(tab - 1);
                if (onPrev) onPrev(form);
                return true;
            }
        },
        [tab]
    );

    const isFinal = useCallback(() => tab >= flexis.length - 1, [tab]);

    const hasPrev = useCallback(() => tab > 0, [tab]);

    const hasNext = useCallback(() => tab < flexis.length - 1, [tab, flexis]);

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
            if (onSubmit) onSubmit(form);
        }
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
        processing,
        tab,
        next,
        prev,
        isFinal,
        hasPrev,
        submit,
        handleChange,
        setProcessing,
    };
};
