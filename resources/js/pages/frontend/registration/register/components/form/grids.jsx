import Grid from "./grid";

export default function Grids({ value }) {
    return (
        <div className={`grid ${"grid-rows-" + value.length} gap-y-2`}>
            {value.map((grid) => (
                <Grid key={grid.grid} value={grid} />
            ))}
        </div>
    );
}
