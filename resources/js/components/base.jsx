import { classNames } from "../helpers";
import { forwardRef, cloneElement } from "react";

export default forwardRef((props, ref) => {
    let _props = props;
    if (_props.className || props._class) {
        _props = {
            ..._props,
            className: classNames(_props.className, _props._class),
            _class: null,
        };
    }

    const element = cloneElement(_props.render, {
        ..._props,
        render: null,
        ref: ref,
    });

    return { ...element };
});
