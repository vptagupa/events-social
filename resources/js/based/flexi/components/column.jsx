import Drop from "./drop";
import Remove from "../actions/remove";
import View from "../actions/view";
import Elipses from "../actions/elipses";
import Caption from "./caption";
import Components from "./components";

export default function Column({
    idx,
    column,
    flex,
    grid,
    flexia,
    view = true,
}) {
    return (
        <div className="flex flex-col w-full --column">
            <div className="relative flex items-center justify-center">
                <div className="absolute -bottom-3  flex items-center gap-x-1">
                    <Elipses>
                        <Remove
                            click={(e) =>
                                flexia.remove(flex, grid, column, column)
                            }
                            title="Remove Column"
                        />
                        {view && (
                            <View
                                title="Expand Column"
                                caption="Column"
                                idx={idx}
                                column={column}
                                flex={flex}
                                grid={grid}
                                flexia={flexia}
                            />
                        )}
                    </Elipses>
                </div>
            </div>
            <div className={`flex flex-col gap-3 p-4 ${column.class} --column`}>
                <Components
                    components={column.components}
                    flex={flex}
                    grid={grid}
                    column={column}
                    flexia={flexia}
                />
                <Drop
                    className="text-center flex flex-col items-center justify-center"
                    onDrop={(e) => {
                        var data;
                        var target;
                        var source;
                        if ((data = e.dataTransfer.getData("data"))) {
                            target = {
                                flex,
                                grid,
                                column,
                                component: JSON.parse(data),
                            };
                        } else if ((data = e.dataTransfer.getData("move"))) {
                            source = JSON.parse(data);
                            target = {
                                flex,
                                grid,
                                column,
                                component: source.component,
                            };
                        }

                        flexia.flexible(target, source);
                    }}
                >
                    Drop here
                    <Caption
                        title={`Column ${idx + 1}`}
                        className="text-center"
                    />
                </Drop>
            </div>
        </div>
    );
}
