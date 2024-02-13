import Form from "./form";

export default function Card({ value }) {
    return (
        <div className="border border-slate-200 rounded-md p-4 bg-white shadow-md">
            <div className="mb-5 border-b border-slate-200">
                {value.config?.name ?? "Form"}
            </div>
            <Form value={value} />
        </div>
    );
}
