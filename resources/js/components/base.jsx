import { forwardRef, cloneElement } from "react";

export default forwardRef((props, ref) => {
    const render = cloneElement(props.render, {
        ...props,
        render: null,
        ref: ref,
    });

    return { ...render };
});
