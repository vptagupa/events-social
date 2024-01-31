import { uid } from "uid";
import { useState } from "react";
import {
    flexs,
    flex as flexRaw,
    grid as gridRaw,
    column as columnRaw,
    attribute as attributeRaw,
} from "./constants";

export const useFlexi = (schema) => {
    const [data, set] = useState(schema || flexs);

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

    const add = (flex, grid, column, component) => {
        if (component.type == "column") {
            if (!grid) {
                grid = addGrid(flex)[flex.grids.length - 1];
            }

            addColumn(grid);
        } else if (component.type == "grid" && !column) {
            addGrid(flex);
        } else if (component.type == "grid" && column?.column) {
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
            if (!grid) {
                grid = addGrid(flex)[flex.grids.length - 1];
            }
            if (!column) {
                column = addColumn(grid)[grid.columns.length - 1];
            }

            addCompon(column, component);
        }

        set({ ...data });
    };

    const flexible = (target, source) => {
        add(target.flex, target.grid, target.column, target.component);

        // Skip when purpose is to add components only
        if (!source) return;

        const truth = truty(
            source.flex,
            source.grid,
            source.column,
            source.component
        );

        remove(truth.flex, truth.grid, truth.column, truth.component);
    };

    const move = (target, from) => {
        if (!target.flex) return;

        // Add a new component when any of the following are empty
        if (!target?.grid || !target?.column) {
            add(target.flex, target?.grid, target?.column, from.component);
        }

        // Replace target from the source when all conditions are supplied
        if (target?.flex && target?.column && from?.component) {
            target.column.components = target.column.components.map((c) => {
                if (c.id === target.component.id) {
                    c = {
                        ...from.component,
                        id: c.id,
                    };
                }

                return c;
            });
        }

        const truth = truty(from.flex, from.grid, from.column, from.component);

        // Replace source from target, or remove a component
        if (target.component) {
            truth.column.components = truth.column.components.map((c) => {
                if (c.id === from.component.id) {
                    c = {
                        ...target.component,
                        id: c.id,
                    };
                }

                return c;
            });
        } else {
            truth.column.components = truth.column.components.filter(
                (c) => c.id != from.component.id
            );
        }

        set({ ...data });
    };

    const remove = (flex, grid, column, component) => {
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

    const change = (flex, grid, column, component, value) => {
        component.config.defaultValue = value;

        set({ ...data });
    };

    const selectChange = (
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

    const selectRemove = (flex, grid, column, component, option) => {
        component.config.options = component.config.options.filter(
            (o) => o.id != option.id
        );

        set({ ...data });
    };

    const selectAdd = (flex, grid, column, component, value, text) => {
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

    const update = (data) => {
        set({ ...data });
    };

    const showTheNextFlex = (flex) => {};

    const truty = (flex, grid, column, component) => {
        const griddable = (grids) => {
            for (var g of grids) {
                var props = columable(g.columns);
                if (props) {
                    return { grid: g, ...props };
                }
            }
        };

        const columable = (columns) => {
            for (var col of columns) {
                var props = componetable(col.components);
                if (props) {
                    return { column: col, component: props };
                }
            }
        };

        const componetable = (components) => {
            for (var c of components) {
                if (c.type != "grid") {
                    if (c.id === component.id) {
                        return c;
                    }
                } else {
                    var props = griddable(c.grids);
                    if (props) {
                        return { flex: c, ...props };
                    }
                }
            }
        };

        const truth = () => {
            for (var f of data.flexis) {
                var props = griddable(f.grids);
                if (props) {
                    return { flex: f, ...props };
                }
            }
        };

        const truthful = (prev, next) => {
            if (next?.component) {
                return truthful(next, next?.component);
            }
            return prev;
        };

        var args = truth();

        // Get the last oomponent in the tree
        if (args.component?.component) {
            args = truthful(args.component, args.component?.component);
        }

        return args;
    };

    return {
        data,
        update,
        plusFlex,
        minusFlex,
        flexible,
        add,
        move,
        remove,
        change,
        selectChange,
        selectRemove,
        selectAdd,
        changeConfig,
        configActive,
        flexToggleShow,
    };
};
