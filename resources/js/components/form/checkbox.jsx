import Base from "../base";
import { forwardRef, cloneElement } from "react";

export default forwardRef((props, ref) => {
    const checkbox = <input type="checkbox" />;
    const clone = cloneElement(checkbox, {
        ...props,
        className: null,
    });

    return (
        <Base
            render={checkbox}
            ref={ref}
            {...clone.props}
            _class={props.className}
            className="p-0 w-4 h-4 appearance-none border border-solid rounded-sm border-slate-400 bg-white  checked:text-slate-300 checked:bg-[url('@/assets/images/check.svg')]"
        />
    );
});
