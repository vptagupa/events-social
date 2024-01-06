import Base from "../base";
import { forwardRef } from "react";

export default forwardRef(({ className = "", ...props }, ref) => {
    return (
        <Base
            render={<form />}
            ref={ref}
            {...props}
            className={`${className}`}
        />
    );
});
