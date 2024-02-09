export default function Heading({ value, type = "h1", className = "" }) {
    const types = {
        h1: <h1 className={className}>{value}</h1>,
        h2: <h2 className={className}>{value}</h2>,
        h3: <h3 className={className}>{value}</h3>,
    };
    return <div className="block p-1">{types[type]}</div>;
}
