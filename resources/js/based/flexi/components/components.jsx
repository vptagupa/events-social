import Component from "./component";
import Grids from "./grids";

export default function Components({ components, flex, grid, column, flexia }) {
    return components.map((component) => {
        if (component.type == "grid") {
            return (
                <Grids
                    grids={component.grids}
                    key={component.id}
                    flex={component}
                    flexia={flexia}
                />
            );
        }

        return (
            <Component
                key={component.id}
                flex={flex}
                grid={grid}
                column={column}
                component={component}
                add={flexia.add}
                move={flexia.move}
                change={flexia.change}
                up={flexia.up}
                down={flexia.down}
                remove={flexia.remove}
                selectChange={flexia.selectChange}
                selectAdd={flexia.selectAdd}
                selectRemove={flexia.selectRemove}
                configActive={flexia.configActive}
                changeConfig={flexia.changeConfig}
                changeProperty={flexia.changeProperty}
            />
        );
    });
}
