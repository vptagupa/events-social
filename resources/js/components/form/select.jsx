import Base from "../base";
import { forwardRef } from "react";

export default forwardRef(({ className = "", ...props }, ref) => {
    return (
        <Base
            render={<select />}
            ref={ref}
            {...props}
            className={`
            p-2 w-full shadow-sm border-0 ring-1 ring-slate-300 
            text-sm rounded-lg focus:outline-purple-300
            appearance-none bg-[url('@/assets/images/icons/sort-down-solid.svg')] 
            bg-origin-padding bg-no-repeat bg-[right_0.5rem_top_0rem] 
            bg-[length:1.5rem_1.5rem] ${className}`}
        />
    );
});
