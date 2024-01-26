import Grid from "./grid";
import Caption from "./caption";

export default function Flex({ flex, flexia }) {
    return (
        <>
            {flex.grids.map((grid) => (
                <div key={grid.grid} className="flex flex-col">
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
