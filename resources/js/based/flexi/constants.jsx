import { uid } from "uid";

export const config = {
    active: false,
    options: [],
    defaultValue: "",
};

export const attribute = {
    title: "",
    type: "",
    value: "",
    attr: [],
    config,
};

export const column = {
    column: 0,
    components: [],
};
const id = uid();
export const grid = {
    grid: 0,
    tree: { flex: 0 },
    columns: [
        {
            ...column,
            column: 0,
            tree: [{ flex: 0 }, { grid: 0 }],
            components: [
                {
                    ...attribute,
                    type: "grid",
                    id,
                    tree: [{ flex: 0 }, { grid: 0 }, { column: 0 }],
                    grids: [
                        {
                            grid: 0,
                            tree: [
                                { flex: 0 },
                                { grid: 0 },
                                { column: 0 },
                                { component: id },
                            ],
                            columns: [
                                {
                                    ...column,
                                    column: 0,
                                    tree: [
                                        { flex: 0 },
                                        { grid: 0 },
                                        { column: 0 },
                                        { component: id },
                                        { grid: 0 },
                                    ],
                                },
                                {
                                    ...column,
                                    tree: [
                                        { flex: 0 },
                                        { grid: 0 },
                                        { column: 0 },
                                        { component: id },
                                        { grid: 0 },
                                    ],
                                    column: 1,
                                },
                            ],
                        },
                    ],
                },
                {
                    ...attribute,
                    type: "text",
                    id: uid(),
                },
            ],
        },
    ],
};

export const step = [
    {
        flex: 0,
        grids: [grid],
    },
];

export const attributes = [
    {
        ...attribute,
        title: "Stepper",
        type: "value",
        value: 1,
        attr: { maxLength: 1 },
    },

    {
        ...attribute,
        title: "Grid",
        type: "grid",
    },
    {
        ...attribute,
        title: "Columns",
        type: "column",
    },
    {
        ...attribute,
        title: "Text",
        type: "text",
    },
    {
        ...attribute,
        title: "Select",
        type: "select",
    },
    {
        ...attribute,
        title: "Textarea",
        type: "textarea",
    },
];

export const conditions = [
    {
        title: "Equal",
        expression: "==",
    },
    {
        title: "Not equal",
        expression: "!=",
    },
    {
        title: "Greater than",
        expression: ">",
    },
    {
        title: "Greater than and equal",
        expression: ">=",
    },
    {
        title: "Less than",
        expression: "<",
    },
    {
        title: "Less than and equal",
        expression: "<=",
    },
];
