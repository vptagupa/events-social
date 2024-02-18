import { uid } from "uid";

export const config = {
    active: false,
    options: [],
    defaultValue: "",
    form: [
        "name",
        "class",
        "style",
        "condition",
        "placeholder",
        "default value",
        "select",
        "is required",
        "is number",
        "is searchable",
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
    title: "Column Configuration",
    config: {
        active: false,
        form: [
            "class",
            "minimum fields required as number",
            "is options required",
        ],
    },
};

export const grid = {
    grid: 0,
    class: "bg-slate-300",
    columns: [],
};

export const flex = {
    flex: uid(),
    grids: [],
    active: true,
    class: "bg-slate-200",
    title: "Step Configuration",
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
        title: "Column",
        type: "column",
    },
    {
        ...attribute,
        title: "Input",
        type: "input",
        properties: {
            type: "text",
            types: ["Text", "Email", "Number", "Date"],
        },
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
        config: {
            ...attribute.config,
            form: ["class", "style", "default value"],
        },
        properties: {
            types: ["info", "success", "danger", "warning"],
        },
    },
    {
        ...attribute,
        title: "Label",
        type: "label",
        config: {
            ...attribute.config,
            form: ["class", "style", "default value"],
        },
    },
    {
        ...attribute,
        title: "Heading",
        type: "heading",
        config: {
            ...attribute.config,
            form: ["class", "style", "default value"],
        },
        properties: {
            types: ["h1", "h2", "h3"],
        },
    },
    {
        ...attribute,
        title: "Contract",
        type: "contract",
        config: {
            ...attribute.config,
            form: ["default value", "name", "is required", "editor"],
        },
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
