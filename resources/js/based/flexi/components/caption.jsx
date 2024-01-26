export default function Caption({ title, className = "" }) {
    return <div className={`text-[0.5rem] ${className}`}>{title}</div>;
}
