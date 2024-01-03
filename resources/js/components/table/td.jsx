import { Cell } from "@table-library/react-table-library/table";
import { forwardRef } from "react";
import Base from "../base";

export default forwardRef((props, ref) => {
    return (
        <Base
            render={<Cell />}
            ref={ref}
            {...props}
            _class="!p-3 border-solid border-b"
        >
            <span className="text-xs">{props.children}</span>
        </Base>
    );
});
