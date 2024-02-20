import { Form as BasedForm } from "@/js/components/form";
import { ControlContext } from "../../context";
import Grids from "../form/grids";
import Prev from "./prev";
import Next from "./next";
import { useContext } from "react";

export default function Form({ value }) {
    const control = useContext(ControlContext);

    return (
        <BasedForm>
            <Grids value={value.grids} control={control} />
            <div className="mt-20 flex gap-x-2 items-center justify-center border border-slate-200 rounded-md p-3">
                {control.data.length > 1 && (
                    <Prev
                        className={`!text-[2rem] !h-14 uppercase !pt-0 !pb-1`}
                        disabled={!control.hasPrev()}
                        title={value.config["prev.title"] ?? "Previous"}
                        onClick={(e) => control.prev(value)}
                        processing={control.processing.prev}
                    />
                )}

                <Next
                    className={`!text-[2rem] !h-14 uppercase !pt-0 !pb-1`}
                    title={
                        value.config["next.title"] ??
                        (control.isFinal() ? "Submit" : "Next")
                    }
                    onClick={(e) =>
                        control.isFinal()
                            ? control.submit(value)
                            : control.next(value)
                    }
                    processing={control.processing.next}
                />
            </div>
        </BasedForm>
    );
}
