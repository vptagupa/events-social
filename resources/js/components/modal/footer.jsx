import { forwardRef } from "react";

export default forwardRef(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            {...props}
            className={`border-t border-solid mt-4 pt-2 ${className}`}
        >
            {props.children}
        </div>
    );
});
