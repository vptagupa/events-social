import { SecondaryButton } from "@/js/components/buttons";

export default function Prev({ title, ...props }) {
    return <SecondaryButton {...props}>{title}</SecondaryButton>;
}
