import Base from "./base";
import { forwardRef } from "react";

export default forwardRef(({ className, ...props }, ref) => {
    return (
        <Base
            ref={ref}
            {...props}
            className={`shadow-slate-400/50 hover:bg-slate-200 ${className}`}
        />
    );
});
