import Column from "./column";
import Drop from "./drop";
import Caption from "./caption";
import Remove from "../actions/remove";

export default function Grid({ flex, grid, ...flexia }) {
    if (grid.columns.length > 0)
        return grid.columns.map((column) => (
            <div key={column.column} className="flex flex-col w-full --column">
                <div className="relative">
                    <div className="absolute -bottom-4 right-0">
                        <Remove
                            click={(e) =>
                                flexia.componentRemove(
                                    flex,
                                    grid,
                                    column,
                                    column
                                )
                            }
                            title="Remove Column"
                        />
                    </div>
                </div>
                <div
                    className={`flex flex-col gap-3 p-4 ${column.config.class} --column`}
                >
                    <Column
                        flex={flex}
                        grid={grid}
                        column={column}
                        {...flexia}
                    />
                    <Drop
                        className="text-center flex items-center justify-center"
                        onDrop={(e) =>
                            flexia.addComponent(
                                flex,
                                grid,
                                column,
                                JSON.parse(e.dataTransfer.getData("data"))
                            )
                        }
                    >
                        Drop here
                    </Drop>
                </div>
                <Caption title={`Column ${column.column}`} />
            </div>
        ));

    return (
        <div className="flex flex-col w-full">
            <Drop
                className="text-center flex items-center justify-center"
                onDrop={(e) =>
                    flexia.addComponent(
                        flex,
                        grid,
                        null,
                        JSON.parse(e.dataTransfer.getData("data"))
                    )
                }
            >
                Drop here
            </Drop>
        </div>
    );
}
