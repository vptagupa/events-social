import { Select as FormSelect } from "@/js/components/form";

export default function Select({ values = [], ...props }) {
    console.log(values);
    return (
        <FormSelect {...props} placeholder="Select here">
            {values.map((value) => (
                <option key={value.id} value={value.value}>
                    {value.text}
                </option>
            ))}
        </FormSelect>
    );
}
