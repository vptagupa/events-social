import { Textarea } from "@/js/components/form";
export default function Status({ name, value }) {
    return (
        <div className="w-full flex-col items-center justify-center gap-y-2">
            <div className="">
                <Textarea rows="5" placeholder="Note"></Textarea>
            </div>
        </div>
    );
}
