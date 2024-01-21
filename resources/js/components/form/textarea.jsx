import Base from "../base";
import { forwardRef } from "react";

export default forwardRef(({ className = "", ...props }, ref) => {
    return (
        <Base
            render={<textarea />}
            ref={ref}
            {...props}
            className={`p-2 w-full shadow-sm border-0 ring-1 ring-slate-300 text-sm rounded-lg ${className}`}
        >
            {props.children}
        </Base>
    );
});
