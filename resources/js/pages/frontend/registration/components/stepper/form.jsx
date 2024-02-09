import { Form as BasedForm } from "@/js/components/form";
import { ControlContext } from "../context";
import Grids from "../form/grids";
import Prev from "./prev";
import Next from "./next";
import { useContext } from "react";

export default function Form({ value }) {
    const control = useContext(ControlContext);
    return (
        <BasedForm>
            <Grids value={value.grids} control={control} />
            <div className="flex gap-x-2 items-center justify-center">
                {control.data.length > 1 && (
                    <Prev
                        disabled={!control.hasPrev()}
                        title={value.config["prev.title"]}
                        onClick={(e) => control.prev(value)}
                    />
                )}

                <Next
                    title={value.config["next.title"]}
                    onClick={(e) =>
                        control.isFinal()
                            ? control.submit(value)
                            : control.next(value)
                    }
                />
            </div>
        </BasedForm>
    );
}
