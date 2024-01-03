import Base from "../base";
import { forwardRef, cloneElement } from "react";

export default forwardRef((props, ref) => {
    const clone = cloneElement(<button {...props} />, {
        ...props,
        _class:
            "transition ease-in-out delay-100 hover:scale-105 duration-300 " +
            props._class,
    });
    return <Base render={<button />} ref={ref} {...clone.props} />;
});
