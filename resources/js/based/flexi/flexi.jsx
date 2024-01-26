import { uid } from "uid";
import { useState } from "react";
import { step, column } from "./constants";

const findIndex = (data, value, key) =>
    data.findIndex((a) => a[key] == value[key]);

var flexIndex = 0;
var gridIndex = 0;
var columnIndex = 0;
var componentIndex = 0;
var tree = [];
var prop = null;

export const useFlexi = () => {
    const [data, set] = useState(step);

    const addComponent = (flex, grid, column, component) => {
        console.log({ flex, grid, column, component });

        if (component.type == "column") {
            grid.columns = grid.columns.concat({
                ...component,
                column: grid.columns.length,
                tree: column.tree,
                components: [],
            });
        } else if (component.type == "grid") {
            column.components = column.components.concat({
                ...component,
                id: uid(),
                type: "grid",
                grids: [
                    {
                        grid: 0,
                        columns: [
                            {
                                ...column,
                                column: 0,
                                tree: [...column.tree, { grid: grid.grid }],
                            },
                        ],
                    },
                ],
            });
        } else {
            column.components = column.components.concat({
                ...component,
                id: uid(),
                components: [],
            });
        }

        flexIndex = findIndex(data, column.tree[0], "flex");
        gridIndex = findIndex(data[flexIndex].grids, column.tree[1], "grid");
        if (column.tree[2]) {
            columnIndex = findIndex(
                data[flexIndex].grids[gridIndex].columns,
                column.tree[2],
                "column"
            );
        } else {
            columnIndex = findIndex(
                data[flexIndex].grids[gridIndex].columns,
                column,
                "column"
            );
        }

        prop = data[flexIndex].grids[gridIndex].columns[columnIndex];

        var tempProp = { ...prop };
        var index = null;
        var columnTree = [...column.tree];

        columnTree.splice(0, 3);

        if (columnTree.length > 0) {
            for (let value of columnTree) {
                if (value?.component && value.component != "") {
                    index = findIndex(
                        tempProp.components,
                        { id: value.component },
                        "id"
                    );
                    tree.push({
                        componentIndex: index,
                    });
                    tempProp = tempProp.components[index];
                }
                if (value?.grid && value.grid != "") {
                    index = findIndex(tempProp.grids, value, "grid");
                    tree.push({
                        gridIndex: index,
                    });
                    tempProp = tempProp.grids[index];
                }
                if (value?.column && value.column != "") {
                    index = findIndex(tempProp.columns, value, "column");
                    tree.push({
                        columnIndex: index,
                    });
                    tempProp = tempProp.columns[index];
                }
            }
        }

        for (index of tree) {
            if (index.componentIndex) {
                prop = prop.components[index.componentIndex];
            } else if (index.gridIndex) {
                prop = prop.grids[index.gridIndex];
            } else if (index.columnIndex) {
                prop = prop.columns[index.columnIndex];
            }
        }

        if (prop?.grid) {
            prop.columns = grid.columns;
            data[flexIndex].grids[gridIndex].columns = grid.columns;
        } else if (prop?.column) {
            data[flexIndex].grids[gridIndex].columns[columnIndex].components =
                column.components;
        }
        console.log(data);
        set([...data]);

        return;
        set(
            data.map((f) => {
                if (f.step === flex.step) {
                    // If not a grid, then append the component to the column.
                    // Otherwise, add a new grid

                    f.grids = f.grids.map((g) => {
                        if (g.grid == grid.grid) {
                            // If not a column, then append the new commponent.
                            // otherwise, Add a new column to the grid
                            if (component.type != "column") {
                                g.columns = g.columns.map((c) => {
                                    if (c.column == column.column) {
                                        c.components =
                                            c.components.concat(component);
                                    }
                                    return c;
                                });
                            } else {
                                g.columns = g.columns.concat({
                                    column: f.columns.length,
                                    components: [
                                        {
                                            id: uid(),
                                            ...component,
                                        },
                                    ],
                                });
                            }
                        }

                        return g;
                    });
                }

                return f;
            })
        );
    };

    const componentRemove = (flex, column, component) => {
        set(
            data.map((f) => {
                if (f.step === flex.step) {
                    f.columns = f.columns.map((c) => {
                        if (c.column == column.column) {
                            c.components = c.components.filter(
                                (a) => a.id != component.id
                            );
                        }
                        return c;
                    });
                }

                return f;
            })
        );
    };

    const componentChange = (flex, column, component, value) => {
        set(
            data.map((f) => {
                if (f.step === flex.step) {
                    f.columns = f.columns.map((c) => {
                        if (c.column == column.column) {
                            const index = c.components.findIndex(
                                (a) => a.id == component.id
                            );
                            if (index !== -1) {
                                c.components[index].config.defaultValue = value;
                            }
                        }
                        return c;
                    });
                }

                return f;
            })
        );
    };

    const componentSelectChange = (
        flex,
        column,
        component,
        option,
        name,
        value
    ) => {
        console.log(value);
        set(
            data.map((f) => {
                if (f.step === flex.step) {
                    f.columns = f.columns.map((c) => {
                        if (c.column == column.column) {
                            c.components = c.components.map((a) => {
                                if (a.id == component.id) {
                                    const index = findIndex(
                                        a.config.options,
                                        option,
                                        "id"
                                    );
                                    if (index !== -1) {
                                        a.config.options[index][name] = value;
                                    }
                                }
                                return a;
                            });
                        }
                        return c;
                    });
                }

                return f;
            })
        );
    };

    const componentSelectRemove = (flex, column, component, option) => {
        set(
            data.map((f) => {
                if (f.step === flex.step) {
                    f.columns = f.columns.map((c) => {
                        if (c.column == column.column) {
                            c.components = c.components.map((a) => {
                                if (a.id == component.id) {
                                    a.config.options = a.config.options.filter(
                                        (o) => o.id != option.id
                                    );
                                }
                                return a;
                            });
                        }
                        return c;
                    });
                }

                return f;
            })
        );
    };

    const componentSelectAdd = (flex, column, component, value, text) => {
        set(
            data.map((f) => {
                if (f.step === flex.step) {
                    f.columns = f.columns.map((c) => {
                        if (c.column == column.column) {
                            c.components = c.components.map((a) => {
                                if (a.id == component.id) {
                                    a.config.options = a.config.options.concat({
                                        id: uid(),
                                        value,
                                        text,
                                    });
                                }
                                return a;
                            });
                        }
                        return c;
                    });
                }

                return f;
            })
        );
    };

    const changeConfig = (flex, column, component, name, value) => {
        console.log([flex, column, component, name, value]);
        set(
            data.map((f) => {
                if (f.step === flex.step) {
                    f.columns = f.columns.map((c) => {
                        if (c.column == column.column) {
                            c.components = c.components.map((a) => {
                                if (a.id == component.id) {
                                    a.config[name] = value;
                                }
                                return a;
                            });
                        }
                        return c;
                    });
                }

                return f;
            })
        );
    };

    const configActive = (flex, column, component) => {
        set(
            data.map((f) => {
                if (f.step === flex.step) {
                    f.columns = f.columns.map((c) => {
                        if (c.column == column.column) {
                            c.components = c.components.map((a) => {
                                if (a.id == component.id) {
                                    a.config.active = !a.config.active;
                                }
                                return a;
                            });
                        }
                        return c;
                    });
                }

                return f;
            })
        );
    };
    console.log(data);
    return {
        data,
        addComponent,
        componentRemove,
        componentChange,
        componentSelectChange,
        componentSelectRemove,
        componentSelectAdd,
        changeConfig,
        configActive,
    };
};
