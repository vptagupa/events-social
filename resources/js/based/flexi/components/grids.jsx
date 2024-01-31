import Grid from "./grid";

export default function Grids({ grids, flex, flexia }) {
    return (
        <>
            {grids.map((grid) => (
                <Grid key={grid.grid} flex={flex} grid={grid} flexia={flexia} />
            ))}
        </>
    );
}
