import Base from "../base";
import { forwardRef } from "react";

export default forwardRef(({ className = "", ...props }, ref) => {
    return (
        <Base
            render={<input type="checkbox" />}
            ref={ref}
            {...props}
            className={`p-0 w-4 h-4 appearance-none border-0 rounded-full 
            ring-1 ring-slate-400
            checked:bg-[url('@/assets/images/icons/check.svg')] 
          checked:ring-green-500 checked:outline-none
            bg-no-repeat bg-center bg-[length:0.8rem_0.8rem] ${className}`}
        />
    );
});
