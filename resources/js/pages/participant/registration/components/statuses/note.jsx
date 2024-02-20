import { Textarea } from "@/js/based/form";
import { ControlContext } from "../../context";
import { useContext } from "react";

export default function Status({ name, value }) {
    const context = useContext(ControlContext);

    return (
        <div className="w-full flex-col items-center justify-center gap-y-2">
            <div className="">
                <Textarea
                    maxLength="250"
                    rows="5"
                    placeholder="Note"
                    error={context.errors?.note}
                    value={context.control.other.note}
                    onChange={(e) =>
                        context.control.setOther({
                            ...context.control.other,
                            note: e.target.value,
                        })
                    }
                >
                    {context.control.other.note}
                </Textarea>
            </div>
        </div>
    );
}
