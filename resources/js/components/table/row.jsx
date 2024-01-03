import { Row } from "@table-library/react-table-library/table";
import { forwardRef } from "react";
import Base from "../base";

export default forwardRef((props, ref) => {
    return <Base render={<Row />} ref={ref} {...props} />;
});
