import Drop from "./drop";
import Remove from "../actions/remove";
import View from "../actions/view";
import Config from "../actions/config";
import Move from "../actions/move";
import Elipses from "../actions/elipses";
import Caption from "./caption";
import Components from "./components";
import ConfigComponent from "./config";

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
                <div className="absolute -bottom-[0.4rem] flex items-center gap-x-1">
                    <Elipses active={column.config.active}>
                        <Config
                            active={column.config.active}
                            click={(e) =>
                                flexia.configActive(flex, grid, column, column)
                            }
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
                        <Remove
                            click={(e) =>
                                flexia.remove(flex, grid, column, column)
                            }
                            title="Remove Column"
                        />
                    </Elipses>
                </div>
            </div>
            {column.config.active && (
                <div className="flex justify-center m-10">
                    <ConfigComponent
                        value={column}
                        change={(name, value) =>
                            flexia.changeConfig(
                                flex,
                                grid,
                                column,
                                column,
                                name,
                                value
                            )
                        }
                    />
                </div>
            )}
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
