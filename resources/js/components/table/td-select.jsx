import { CellSelect } from "@table-library/react-table-library/select";
import { forwardRef } from "react";
import Base from "../base";

export default forwardRef(({ className = "", ...props }, ref) => {
    return (
        <Base
            render={<CellSelect />}
            ref={ref}
            {...props}
            className={`${className}`}
        >
            {props.children}
        </Base>
    );
});
