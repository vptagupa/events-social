import Column from "./column";

export default function Columns({ columns, flex, grid, flexia }) {
    return columns.map((column, idx) => (
        <Column
            idx={idx}
            key={column.column}
            flex={flex}
            grid={grid}
            column={column}
            flexia={flexia}
        />
    ));
}
