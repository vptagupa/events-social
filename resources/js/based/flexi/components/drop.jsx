export default function Drop({ className = "", onDrop, ...props }) {
    const target = (e) => {
        let component = e.target.getElementsByClassName("component");
        if (
            ["input", "textarea", "select"].includes(
                e.target.nodeName.toLowerCase()
            )
        ) {
            component = e.target.parentElement.parentElement;
        }

        return component;
    };
    return (
        <div
            className={`border-2 border-dotted border-slate-300 rounded-md min-h-10 w-full px-3 py-6 ${className} --drop`}
            onDrop={(e) => {
                onDrop(e);
                const component = target(e);
                if (component) {
                    if (component.classList) {
                        component.classList.remove("drop-over");
                    }
                }
            }}
            onDragOver={(e) => {
                e.preventDefault();

                const component = target(e);
                if (component) {
                    if (component.classList) {
                        component.classList.add("drop-over");
                    }
                }
            }}
            onDragLeave={(e) => {
                e.preventDefault();

                const component = target(e);
                if (component) {
                    if (component.classList) {
                        component.classList.remove("drop-over");
                    }
                }
            }}
            {...props}
        >
            {props.children}
        </div>
    );
}
