import Base from "@/js/components/base";
import { forwardRef } from "react";

export default forwardRef(({ className, ...props }, ref) => {
    return (
        <Base
            render={<div />}
            ref={ref}
            {...props}
            className={`text-sm text-white bg-opacity-50 p-3 rounded-lg ${className}`}
        />
    );
});
