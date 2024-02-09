import Grids from "../form/grids";

export default function Form({ value }) {
    return (
        <div>
            <Grids value={value.grids} />
        </div>
    );
}
