import { Button } from "@/js/components/buttons";

export default function Prev({ title, className, ...props }) {
    return (
        <Button
            type="button"
            {...props}
            className={`disabled:bg-slate-300 ${className}`}
        >
            {title}
        </Button>
    );
}
