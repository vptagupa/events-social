import Base from "@/js/components/base";
import { forwardRef, cloneElement } from "react";

export default forwardRef((props, ref) => {
    const clone = cloneElement(<div {...props} />, {
        ...props,
        _class:
            "text-sm text-white bg-opacity-50 p-3 rounded-lg " + props._class,
    });
    return <Base render={<div />} ref={ref} {...clone.props} />;
});
