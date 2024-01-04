import { Cell } from "@table-library/react-table-library/table";
import { forwardRef } from "react";
import Base from "../base";

export default forwardRef(({ className, ...props }, ref) => {
    return (
        <Base
            render={<Cell />}
            ref={ref}
            {...props}
            className={`!p-3 border-solid border-b ${className}`}
        >
            <span className="text-xs">{props.children}</span>
        </Base>
    );
});
