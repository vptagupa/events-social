import { uid } from "uid";
import { router } from "@inertiajs/react";

export const offer = {
    name: "",
    description: "",
    price: 0,
    active: true,
};

export const packages = {
    offers: [
        {
            ...offer,
            id: uid(),
        },
        {
            ...offer,
            id: uid(),
        },
        {
            ...offer,
            id: uid(),
        },
    ],
    price: 0,
    properties: {
        max: 4,
    },
};
