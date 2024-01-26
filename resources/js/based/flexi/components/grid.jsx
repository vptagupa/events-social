import Column from "./column";
import Drop from "./drop";
import Caption from "./caption";

export default function Grid({ flex, grid, ...flexia }) {
    return grid.columns.map((column) => (
        <div key={column.column} className="flex flex-col w-full">
            <div className="flex flex-col gap-3 p-4 bg-slate-100 --column">
                <Column flex={flex} grid={grid} column={column} {...flexia} />
                <Drop
                    className="text-center flex items-center justify-center"
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.target.classList.remove("border-slate-300");
                        e.target.classList.remove("border-green-600");
                        e.target.classList.add("border-green-600");
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault();
                        e.target.classList.add("border-slate-300");
                        e.target.classList.remove("border-green-600");
                    }}
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
}
