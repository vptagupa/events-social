import Base from "./base";
import { forwardRef } from "react";

export default forwardRef((props, ref) => {
    return (
        <Base
            _class="danger rounded-lg shadow-md shadow-slate-400/50 hover:bg-red-400 px-5 py-2 text-sm"
            ref={ref}
            {...props}
        />
    );
});
