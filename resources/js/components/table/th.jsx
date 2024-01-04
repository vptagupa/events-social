import { HeaderCell } from "@table-library/react-table-library/table";
import { forwardRef } from "react";
import Base from "../base";

export default forwardRef(({ className, ...props }, ref) => {
    return (
        <Base
            render={<HeaderCell />}
            ref={ref}
            {...props}
            className={`!p-3 uppercase text-xxs font-weight-bold opacity-70 border-b border-solid ${className}`}
        />
    );
});
