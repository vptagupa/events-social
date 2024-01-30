import { Radio as InputRadio } from "@/js/components/form";

export default function Radio({ title, value, onChange, ...props }) {
    return (
        <div className="my-2 p-1 flex items-center">
            <label className="flex items-center gap-x-2">
                <InputRadio value={value} onChange={onChange} {...props} />
                {title}
            </label>
        </div>
    );
}
