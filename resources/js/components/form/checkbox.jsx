import Base from "../base";
import { forwardRef } from "react";

export default forwardRef(({ className = "", ...props }, ref) => {
    return (
        <Base
            render={<input type="checkbox" />}
            ref={ref}
            {...props}
            className={`p-0 w-4 h-4 appearance-none border border-solid rounded-sm border-slate-400 bg-white  checked:text-slate-300 checked:bg-[url('@/assets/images/check.svg')] ${className}`}
        />
    );
});
