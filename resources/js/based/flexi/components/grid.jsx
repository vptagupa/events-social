import Caption from "./caption";
import Remove from "../actions/remove";
import Drop from "./drop";
import Columns from "./columns";

export default function Grid({ flex, grid, flexia }) {
    return (
        <div className="flex flex-col --grid">
            <div className="relative">
                <div className="absolute -bottom-4 right-0">
                    <Remove
                        click={(e) => flexia.remove(flex, grid, null, grid)}
                        title="Remove Grid"
                    />
                </div>
            </div>
            <div
                className={`flex flex-col items-center gap-3 p-4 ${grid.class} --grid`}
            >
                <div className="flex w-full gap-3">
                    <Columns
                        columns={grid.columns}
                        flex={flex}
                        grid={grid}
                        flexia={flexia}
                    />
                </div>
                <Drop
                    className="text-center flex flex-col items-center justify-center"
                    onDrop={(e) =>
                        flexia.add(
                            flex,
                            grid,
                            null,
                            JSON.parse(e.dataTransfer.getData("data"))
                        )
                    }
                >
                    Drop here
                    <Caption title={`Grid`} className="text-center" />
                </Drop>
            </div>
        </div>
    );
}
