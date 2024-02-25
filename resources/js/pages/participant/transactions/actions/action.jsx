import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import View from "./view";
import { useState, memo } from "react";

export default memo(function Action({ value }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <span
                onClick={(e) => setOpen(true)}
                className={`p-2  rounded-lg !text-xs cursor-pointer underline underline-offset-4 hover:decoration-purple-700 decoration-purple-400 decoration-2`}
            >
                {value.status}
            </span>
            <View value={value} open={open} parentSetOpen={setOpen} />
        </>
    );
});
