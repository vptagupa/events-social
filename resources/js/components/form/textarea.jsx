import Base from "../base";
import { forwardRef, cloneElement } from "react";

export default forwardRef((props, ref) => {
    const clone = cloneElement(<textarea />, {
        ...props,
        className: null,
    });
    return (
        <Base
            render={<textarea />}
            ref={ref}
            {...clone.props}
            _class={props.className}
            className="p-2 w-full shadow-sm border text-sm rounded-lg"
        >
            {props.children}
        </Base>
    );
});
