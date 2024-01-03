import Base from "../base";
import { forwardRef, cloneElement } from "react";

export default forwardRef((props, ref) => {
    const clone = cloneElement(<form />, {
        ...props,
        className: null,
    });
    return (
        <Base
            render={<form />}
            ref={ref}
            {...clone.props}
            _class={props.className}
            className=""
        />
    );
});
