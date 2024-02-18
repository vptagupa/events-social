import Card from "./card";
import { ControlContext } from "../../context";
import { useContext } from "react";

export default function Cards({ workshop }) {
    const context = useContext(ControlContext);
    return (
        <div className="w-full grid md:grid-cols-2 items-start gap-4">
            {context.control.data.map((flex) => (
                <Card key={flex.flex} value={flex} />
            ))}
        </div>
    );
}
