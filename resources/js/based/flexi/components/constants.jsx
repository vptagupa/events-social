export const config = {
    active: false,
    options: [],
};

export const attribute = {
    title: "",
    type: "",
    value: "",
    attr: [],
    config,
};

export const data = [
    {
        step: 1,
        columns: [
            {
                column: 1,
                components: [],
            },
        ],
    },
];

export const attributes = [
    {
        title: "Stepper",
        type: "value",
        value: 1,
        config,
        attr: { maxLength: 1 },
    },
    {
        title: "Columns",
        type: "div",
        value: "",
        config,
    },

    {
        title: "Text",
        type: "text",
        value: "",
        config,
    },
    {
        title: "Select",
        type: "select",
        config,
    },
    {
        title: "Textarea",
        type: "textarea",
        config,
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
