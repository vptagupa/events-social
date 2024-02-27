import { Select as FormSelect } from "@/js/components/form";

export default function Select({
    placeholder = "Select here",
    values = [],
    title,
    ...props
}) {
    return (
        <div>
            {title && <label className="block text-xs mb-1">{title}</label>}
            <FormSelect {...props} placeholder={placeholder}>
                {values.map((value) => (
                    <option key={value.id} value={value.value}>
                        {value.text}
                    </option>
                ))}
            </FormSelect>
        </div>
    );
}
