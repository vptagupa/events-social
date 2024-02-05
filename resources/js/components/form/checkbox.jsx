import Base from "../base";
import { forwardRef } from "react";

export default forwardRef(({ className = "", ...props }, ref) => {
    return (
        <Base
            render={<input type="checkbox" />}
            ref={ref}
            {...props}
            className={`p-1 w-5 h-5 appearance-none border-0 rounded-sm outline-none cursor-pointer
            transition ease-in-out delay-75 duration-100
            ring-1 ring-purple-500 
            checked:bg-[url('@/assets/images/icons/check.svg')] 
          checked:ring-purple-500 checked:bg-purple-500 checked:outline-none
            bg-no-repeat bg-center bg-[length:0.8rem_0.8rem] ${className}`}
        />
    );
});
