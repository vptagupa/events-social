import Component from "./component";
import Grids from "./grids";

export default function Column({ value }) {
    return (
        <div>
            {value.components.map((component) => {
                if (component.type == "grid") {
                    return <Grids key={component.id} value={component.grids} />;
                }

                return <Component key={component.id} value={component} />;
            })}
        </div>
    );
}
