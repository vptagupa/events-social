import { Calendar as Cal } from "react-date-range";
import { memo } from "react";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

export default memo(function Calendar({ date, onChange }) {
    console.log("d");
    return <Cal date={date} onChange={onChange} />;
});
