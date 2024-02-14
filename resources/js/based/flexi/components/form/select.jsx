import { Select as FormSelect } from "@/js/components/form";

export default function Select({
    placeholder = "Select here",
    values = [],
    ...props
}) {
    return (
        <FormSelect {...props} placeholder={placeholder}>
            {values.map((value) => (
                <option key={value.id} value={value.value}>
                    {value.text}
                </option>
            ))}
        </FormSelect>
    );
}
