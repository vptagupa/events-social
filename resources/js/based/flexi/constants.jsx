export const config = {
    active: false,
    options: [],
    defaultValue: "",
};

export const attribute = {
    title: "",
    type: "",
    value: "",
    draggable: true,
    attr: [],
    config,
};

export const column = {
    column: 0,
    components: [],
};

export const grid = {
    grid: 0,
    columns: [{ ...column }],
};

export const flexs = {
    flexis: [
        {
            flex: 0,
            grids: [],
        },
    ],
    properties: { flex: 1 },
};

export const attributes = [
    {
        ...attribute,
        title: "Steps",
        type: "flex",
        value: 1,
        attr: { maxLength: 1 },
        draggable: false,
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
    {
        ...attribute,
        title: "Notes",
        type: "notes",
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
