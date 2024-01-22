import { Calendar as Cal } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

export default function Calendar(props) {
    return <Cal {...props} />;
}
