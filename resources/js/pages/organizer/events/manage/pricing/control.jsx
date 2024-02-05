import { useState, useCallback } from "react";
import { packages, offer } from "./constant";
import { uid } from "uid";

export const useControl = ({ price, offers }) => {
    const [data, set] = useState({
        ...packages,
        offers: offers.length > 0 ? offers : packages.offers,
        price,
    });

    const add = useCallback(() => {
        const n = { ...offer, id: uid() };
        data.offers = data.offers.concat(n);
        set({ ...data });
    }, [data]);

    const remove = useCallback(
        (offer) => {
            data.offers = data.offers.filter((o) => o.id != offer.id);

            set({ ...data });
        },
        [data]
    );

    const change = useCallback(
        (offer, key, value) => {
            offer[key] = value;

            set({ ...data });
        },
        [data]
    );

    const setActive = useCallback(
        (offer, active) => {
            offer.active = active;

            set({ ...data });
        },
        [data]
    );

    const setPrice = useCallback(
        (price) => {
            data.price = price;
            set({ ...data });
        },
        [data]
    );

    const setData = useCallback(
        (value) => {
            let offers = value.offers;

            if (value.offers.length <= 0) {
                offers = packages.offers;
            } else if (value.offers.length < data.offers.length) {
                offers = offers.concat(data.offers[data.offers.length - 1]);
            }

            set({
                ...packages,
                ...value,
                offers,
            });
        },
        [data]
    );

    return { data, add, change, remove, setPrice, setActive, setData };
};
