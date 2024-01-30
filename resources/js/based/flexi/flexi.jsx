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
        if (component.type == "column") {
            if (!grid) {
                grid = addGrid(flex)[flex.grids.length - 1];
            }

            addColumn(grid);
        } else if (component.type == "grid" && !column) {
            addGrid(flex);
        } else if (component.type == "grid" && column?.column) {
            if (column) {
                const cgrid = column.components.filter((c) => c.type == "grid");
                if (cgrid.length > 0) {
                    addGrid(cgrid[0]);
                } else {
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
        addComponent(target.flex, target.grid, target.column, target.component);

        // Skip when the purpose is add components only
        if (!source) return;

        const truth = sourceTruth(
            source.flex,
            source.grid,
            source.column,
            source.component
        );

        const props = (prev, next) => {
            if (next?.component) {
                return props(next, next?.component);
            }
            return prev;
        };

        var args = {
            flex: truth.flex,
            column: truth.column,
            grid: truth.grid,
            component: truth.component,
        };

        if (truth.component?.component) {
            args = props(truth.component, truth.component?.component);
        }

        componentRemove(args.flex, args.grid, args.column, args.component);
    };

    const sourceTruth = (flex, grid, column, component) => {
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
        for (var f of data.flexis) {
            var props = griddable(f.grids);
            if (props) {
                return { flex: f, ...props };
            }
        }
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
                        grid.columns = columable(grid.columns, target, source);
                    }
                }

                return grid;
            });
        };

        const columable = (columns, target, source) => {
            return columns.map((column) => {
                if (column.column === target.column.column) {
                    // Replace target column with source column
                    if (source.component?.column) {
                        column = source.column;
                    } else {
                        column.components = compnenable(
                            column.components,
                            target,
                            source
                        );
                    }
                }
                return column;
            });
        };

        const compnenable = (components, target, source) => {
            return components.map((component) => {
                if (component.type == "grid") {
                    component.grids = griddable(
                        component.grids,
                        target,
                        source
                    );
                } else {
                    if (component.id === target.component.id) {
                        component = {
                            ...source.component,
                            id: component.id,
                        };
                    }
                }

                return component;
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
        flexible,
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
