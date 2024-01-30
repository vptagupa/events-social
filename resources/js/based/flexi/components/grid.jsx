import Column from "./column";
import Drop from "./drop";
import Caption from "./caption";
import Remove from "../actions/remove";

export default function Grid({ flex, grid, ...flexia }) {
    return grid.columns.map((column, idx) => (
        <div key={column.column} className="flex flex-col w-full --column">
            <div className="relative">
                <div className="absolute -bottom-4 right-0">
                    <Remove
                        click={(e) =>
                            flexia.componentRemove(flex, grid, column, column)
                        }
                        title="Remove Column"
                    />
                </div>
            </div>
            <div
                className={`flex flex-col gap-3 p-4 ${column.config.class} --column`}
            >
                <Column flex={flex} grid={grid} column={column} {...flexia} />
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
    ));
}
