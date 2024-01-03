import { HeaderCell } from "@table-library/react-table-library/table";
import { forwardRef } from "react";
import Base from "../base";

export default forwardRef((props, ref) => {
    return (
        <Base
            render={<HeaderCell />}
            ref={ref}
            {...props}
            _class="!p-3 uppercase text-xxs font-weight-bold opacity-70 border-b border-solid"
        />
    );
});
