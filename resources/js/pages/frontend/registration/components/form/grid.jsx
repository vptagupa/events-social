import Columns from "./columns";
export default function Grid({ value }) {
    return (
        <div>
            <Columns value={value.columns} />
        </div>
    );
}
