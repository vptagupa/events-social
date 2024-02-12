import { Button } from "@/js/components/buttons";

export default function Prev({ title, ...props }) {
    return (
        <Button type="button" {...props}>
            {title}
        </Button>
    );
}
