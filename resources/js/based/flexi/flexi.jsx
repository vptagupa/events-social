import { uid } from "uid";
import { useState } from "react";
import {
    flexs,
    flex as flexRaw,
    grid as gridRaw,
    column as columnRaw,
    attribute as attributeRaw,
} from "./constants";

export const useFlexi = () => {
    const [data, set] = useState(flexs);

    const addGrid = (flex) => {
        const grid = { ...gridRaw };
        flex.grids = flex.grids.concat({
            ...grid,
            grid: uid(),
        });

        return flex.grids;
    };

    const addColumn = (grid) => {
        const column = { ...columnRaw };
        grid.columns = grid.columns.concat({
            ...column,
            column: uid(),
        });

        return grid.columns;
    };

    const addCompon = (column, component) => {
        column.components = column.components.concat({
            ...component,
            id: uid(),
        });
    };

    const addComponent = (flex, grid, column, component) => {
        if (flex.grids.length <= 0) {
            grid = addGrid(flex)[0];
        }

        if (component.type == "column") {
            addColumn(grid);
        } else if (component.type == "grid") {
            if (column) {
                const attribute = { ...attributeRaw };
                const grid = { ...gridRaw };
                addCompon(column, {
                    ...attribute,
                    type: "grid",
                    grids: [
                        {
                            ...grid,
                            grid: uid(),
                        },
                    ],
                });
            }
        } else {
            if (grid.columns.length <= 0) {
                column = addColumn(grid)[0];
            }

            addCompon(column, component);
        }

        set({ ...data });
    };

    const moveComponent = (target, from) => {
        const movable = (flexis, target, source) => {
            flexis.map((flex) => {
                if (flex.flex === target.flex.flex) {
                    flex.grids = griddable(flex.grids, target, source);
                }
                return flex;
            });

            return flexis;
        };

        const griddable = (grids, target, source) => {
            return grids.map((grid) => {
                if (grid.grid === target.grid.grid) {
                    // Replace target grid with source grid
                    if (source.component?.grid) {
                        grid = source.grid;
                    } else {
                        grid.columns = grid.columns.map((column) => {
                            if (column.column === target.column.column) {
                                // Replace target column with source column
                                if (source.component?.column) {
                                    column = source.column;
                                } else {
                                    column.components = column.components.map(
                                        (component) => {
                                            if (component.type == "grid") {
                                                component.grids = griddable(
                                                    component.grids,
                                                    target,
                                                    source
                                                );
                                            } else {
                                                if (
                                                    component.id ===
                                                    target.component.id
                                                ) {
                                                    component = {
                                                        ...source.component,
                                                        id: component.id,
                                                    };
                                                }
                                            }

                                            return component;
                                        }
                                    );
                                }
                            }
                            return column;
                        });
                    }
                }

                return grid;
            });
        };

        // Move component to target and vice versa
        movable(data.flexis, target, from);
        movable(data.flexis, from, target);

        set({ ...data });
    };

    const componentRemove = (flex, grid, column, component) => {
        // Remove flex
        if (component?.flex) {
            data.flexis = data.flexis.filter((f) => f.flex != component.flex);
            showTheNextFlex(component);
        }
        // Remove grid
        else if (component?.grid) {
            flex.grids = flex.grids.filter((g) => g.grid != component.grid);
        }
        // Remove column
        else if (component?.column) {
            grid.columns = grid.columns.filter(
                (c) => c.column != component.column
            );
        } else {
            // Remove component
            column.components = column.components.filter(
                (c) => c.id != component.id
            );
        }

        set({ ...data });
    };

    const componentChange = (flex, grid, column, component, value) => {
        component.config.defaultValue = value;

        set({ ...data });
    };

    const componentSelectChange = (
        flex,
        grid,
        column,
        component,
        option,
        name,
        value
    ) => {
        component.config.options.map((o) => {
            if (o.id == option.id) {
                o[name] = value;
            }
            return o;
        });

        set({ ...data });
    };

    const componentSelectRemove = (flex, grid, column, component, option) => {
        component.config.options = component.config.options.filter(
            (o) => o.id != option.id
        );

        set({ ...data });
    };

    const componentSelectAdd = (flex, grid, column, component, value, text) => {
        component.config.options = component.config.options.concat({
            id: uid(),
            value,
            text,
        });

        set({ ...data });
    };

    const changeConfig = (flex, grid, column, component, name, value) => {
        component.config[name] = value;

        set({ ...data });
    };

    const configActive = (flex, grid, column, component) => {
        component.config.active = !component.config.active;

        set({ ...data });
    };

    const flexToggleShow = (flex) => {
        data.flexis.map((f) => {
            f.active = false;
            if (f.flex == flex.flex) {
                f.active = true;
            }
            return f;
        });

        set({ ...data });
    };

    const plusFlex = () => {
        if (data.flexis.length >= data.properties.maxFlex) return;

        const flex = {
            ...flexRaw,
            flex: uid(),
            active: data.flexis.length <= 0 ? true : false,
            config: {
                ...flexRaw.config,
                name: flexRaw.config.name + " " + (data.flexis.length + 1),
            },
        };

        data.flexis = data.flexis.concat(flex);

        set({ ...data });
    };

    const minusFlex = () => {
        if (data.flexis.length > 0) {
            showTheNextFlex(data.flexis.pop());
        }

        set({ ...data });
    };

    const showTheNextFlex = (flex) => {};

    return {
        data,
        plusFlex,
        minusFlex,
        addComponent,
        moveComponent,
        componentRemove,
        componentChange,
        componentSelectChange,
        componentSelectRemove,
        componentSelectAdd,
        changeConfig,
        configActive,
        flexToggleShow,
    };
};
