import { Form as BasedForm } from "@/js/components/form";
import { ControlContext } from "../../context";
import Grids from "../form/grids";
import { useContext } from "react";

export default function Form({ value }) {
    const control = useContext(ControlContext);
    return (
        <BasedForm>
            <Grids value={value.grids} control={control} />
        </BasedForm>
    );
}
