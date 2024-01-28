import { PrimaryButton } from "@/js/components/buttons";

export default function Next({ title, ...props }) {
    return <PrimaryButton {...props}>{title}</PrimaryButton>;
}
