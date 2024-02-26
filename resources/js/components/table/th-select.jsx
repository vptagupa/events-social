import {
    HeaderCellSelect,
    CellSelect,
    SelectClickTypes,
    SelectTypes,
    useRowSelect,
} from "@table-library/react-table-library/select";
import { forwardRef } from "react";
import Base from "../base";

export default forwardRef(({ className = "", ...props }, ref) => {
    return (
        <Base
            render={<HeaderCellSelect />}
            ref={ref}
            {...props}
            className={`${className}`}
        />
    );
});
