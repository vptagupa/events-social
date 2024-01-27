import Grid from "./grid";
import Caption from "./caption";
import Remove from "../actions/remove";

export default function Flex({ flex, flexia }) {
    return (
        <>
            {flex.grids.map((grid) => (
                <div key={grid.grid} className="flex flex-col">
                    <div className="relative">
                        <div className="absolute -bottom-4 right-0">
                            <Remove
                                click={(e) =>
                                    flexia.componentRemove(
                                        flex,
                                        grid,
                                        null,
                                        grid
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-slate-200 --grid">
                        <Grid flex={flex} grid={grid} {...flexia} />
                    </div>
                    <Caption
                        title={`Grid ${grid.grid}`}
                        className="text-center"
                    />
                </div>
            ))}
        </>
    );
}
