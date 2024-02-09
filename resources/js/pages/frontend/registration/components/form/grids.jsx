import Grid from "./grid";

export default function Grids({ value }) {
    return (
        <div className={`grid ${"grid-rows-" + value.length}`}>
            {value.map((grid) => (
                <Grid key={grid.grid} value={grid} />
            ))}
        </div>
    );
}
