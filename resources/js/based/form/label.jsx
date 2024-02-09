export default function Label({ value, className = "" }) {
    return (
        <div className="block p-1">
            <label>{value}</label>
        </div>
    );
}
