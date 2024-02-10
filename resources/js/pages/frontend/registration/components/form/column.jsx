import Component from "./component";
import Grids from "./grids";

export default function Column({ value }) {
    console.log(value);
    return (
        <div>
            {value.components.map((component) => {
                if (component.type == "grid") {
                    return <Grids key={component.id} value={component.grids} />;
                }

                return (
                    <Component
                        column={value}
                        key={component.id}
                        value={component}
                    />
                );
            })}
            {value?.error && (
                <div className="block p-1 text-danger">{value.error}</div>
            )}
        </div>
    );
}
