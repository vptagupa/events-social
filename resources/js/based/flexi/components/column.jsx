import Component from "./component";
import Flex from "./flex";

export default function Column({ grid, column, flex, ...flexia }) {
    return column.components.map((component) => {
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
                add={flexia.addComponent}
                change={flexia.componentChange}
                remove={flexia.componentRemove}
                selectChange={flexia.componentSelectChange}
                selectAdd={flexia.componentSelectAdd}
                selectRemove={flexia.componentSelectRemove}
                configActive={flexia.configActive}
                changeConfig={flexia.changeConfig}
            />
        );
    });
}
