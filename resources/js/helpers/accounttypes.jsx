import { useState } from "react";
import { usePage } from "@inertiajs/react";

export const useAccountTypes = () => {
    const { accountTypes } = usePage().props;
    const [data, setData] = useState(accountTypes.data);

    const reset = () => {
        setData(
            data.map((d) => {
                d.checked = false;
                return d;
            }),
        );
    };

    const check = (id) => {
        const idx = Array.isArray(id) ? id : [id];
        setData(
            data.map((d) => {
                if (idx.includes(d.id)) {
                    d.checked = !d.checked;
                }

                return d;
            }),
        );
    };

    const checkArray = (id, checked = false) => {
        const idx = Array.isArray(id) ? id : [id];
        setData(
            data.map((d) => {
                d.checked = false;
                if (idx.includes(d.id)) {
                    d.checked = checked;
                }

                return d;
            }),
        );
    };

    return {
        data,
        check,
        reset,
        setData,
        checkArray,
    };
};
