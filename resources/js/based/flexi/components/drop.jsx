export default function Drop({ className = "", ...props }) {
    return (
        <div
            className={`border-2 border-dotted border-slate-300 rounded-md min-h-10 w-full p-3 ${className}`}
            {...props}
        >
            {props.children}
        </div>
    );
}
