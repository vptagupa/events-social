import Column from "./column";

export default function Columns({ value }) {
    return (
        <div className={`grid ${"grid-cols-" + value.length}`}>
            {value.map((column) => (
                <Column key={column.column} value={column} />
            ))}
        </div>
    );
}
