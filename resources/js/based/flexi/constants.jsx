import { uid } from "uid";

export const config = {
    active: false,
    options: [],
    defaultValue: "",
    class: "",
    form: [
        "name",
        "label",
        "class",
        "style",
        "condition",
        "placeholder",
        "default value",
        "is required",
        "select",
    ],
};

export const attribute = {
    title: "",
    type: "",
    value: "",
    draggable: true,
    attr: [],
    class: "bg-slate-100",
    config,
};

export const column = {
    column: 0,
    components: [],
    class: "bg-slate-200",
};

export const grid = {
    grid: 0,
    class: "bg-slate-100",
    columns: [],
};

export const flex = {
    flex: uid(),
    grids: [],
    active: true,
    class: "bg-slate-200",
    config: {
        name: "Step",
        active: false,
        form: ["name", "class", "style", "next button", "prev button"],
    },
};

export const flexs = {
    flexis: [
        {
            ...flex,
            config: {
                ...flex.config,
                name: flex.config.name + " 1",
            },
        },
    ],
    properties: { maxFlex: 5 },
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
        title: "Checkbox",
        type: "checkbox",
    },
    {
        ...attribute,
        title: "Radio",
        type: "radio",
    },
    {
        ...attribute,
        title: "File",
        type: "file",
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
