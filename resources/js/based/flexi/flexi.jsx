import { uid } from "uid";
import { useState } from "react";
import { flexs, attribute } from "./constants";

export const useFlexi = () => {
    const [data, set] = useState(flexs);

    const addGrid = (flex) => {
        flex.grids = flex.grids.concat({
            grid: flex.grids.length,
            columns: [],
        });

        return flex.grids;
    };

    const addColumn = (grid) => {
        grid.columns = grid.columns.concat({
            column: grid.columns.length,
            components: [],
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
                addCompon(column, {
                    ...attribute,
                    type: "grid",
                    grids: [
                        {
                            grid: 0,
                            columns: [],
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

    const moveComponent = (flex, grid, column, component, from) => {
        set({ ...data });
    };

    const componentRemove = (flex, grid, column, component) => {
        if (!component) {
            data.flexis = data.flexis.filter((f) => f.flex != flex.flex);

            set({ ...data });
            return;
        }
        // Remove grid
        if (component?.grid >= 0) {
            flex.grids = flex.grids.filter((g) => g.grid != component.grid);
        }
        // Remove column
        else if (component?.column >= 0) {
            grid.columns = grid.columns.filter(
                (c) => c.column != component.column
            );
        } else {
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

    const plusFlex = () => {
        data.flexis = data.flexis.concat({
            flex: data.flexis.length,
            grids: [],
        });

        set({ ...data });
    };

    const minusFlex = () => {
        if (data.flexis.length > 0) {
            data.flexis.pop();

            set({ ...data });
        }
    };

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
    };
};
