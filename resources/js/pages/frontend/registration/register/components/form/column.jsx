import Component from "./component";
import Grids from "./grids";

export default function Column({ value }) {
    return (
        <div>
            {value.components.map((component) => {
                if (component.type == "grid") {
                    return <Grids key={component.id} value={component.grids} />;
                }

                return (
                    <div
                        className={`py-6 px-6 rounded-xl bg-white ml-0 mb-4 mr-0 md:m-4 border  ${
                            component?.error
                                ? "border-[#BF3131]"
                                : "border-slate-300"
                        }`}
                    >
                        <Component
                            column={value}
                            key={component.id}
                            value={component}
                        />
                    </div>
                );
            })}
            {value?.error && (
                <div className="block p-1 text-danger">{value.error}</div>
            )}
        </div>
    );
}
