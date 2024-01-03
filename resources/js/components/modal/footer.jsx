import { forwardRef } from "react";

export default forwardRef((props, ref) => {
    return (
        <>
            <div
                ref={ref}
                {...props}
                className="border-t border-solid mt-4 pt-2"
            >
                {props.children}
            </div>
        </>
    );
});
