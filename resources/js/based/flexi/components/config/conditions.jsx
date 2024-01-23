import { Select, Input } from "@/js/components/form";

export default function Conditions({
    title,
    expression,
    value,
    onChangeExpr,
    onChangeValue,
    conditions,
}) {
    return (
        <div className="block p-1">
            <label>{title}</label>
            <div className="flex gap-x-2 my-2">
                <Select
                    className="!w-20"
                    value={expression}
                    onChange={(e) => onChangeExpr(e.target.value)}
                >
                    <option>Choose</option>
                    {conditions.map((condition, idx) => (
                        <option key={idx} value={condition.expression}>
                            {condition.expression}
                        </option>
                    ))}
                </Select>
                <Input
                    type="text"
                    className="grow"
                    value={value}
                    onChange={(e) => onChangeValue(e.target.value)}
                />
            </div>
        </div>
    );
}
