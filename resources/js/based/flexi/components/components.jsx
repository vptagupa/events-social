import Component from "./component";
import Flex from "./flex";

export default function Components({ components, flex, grid, column, flexia }) {
    return components.map((component) => {
        if (component.type == "grid") {
            return <Flex key={component.id} flex={component} flexia={flexia} />;
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
                remove={flexia.remove}
                selectChange={flexia.selectChange}
                selectAdd={flexia.selectAdd}
                selectRemove={flexia.selectRemove}
                configActive={flexia.configActive}
                changeConfig={flexia.changeConfig}
            />
        );
    });
}
