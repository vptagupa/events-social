import Base from "./base";
import { forwardRef } from "react";

export default forwardRef((props, ref) => {
    return <Base ref={ref} _class="danger" {...props} />;
});
