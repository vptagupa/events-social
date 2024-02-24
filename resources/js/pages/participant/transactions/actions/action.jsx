import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import View from "./view";
import { useState, memo } from "react";

export default memo(function Action({ value }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <FontAwesomeIcon
                icon={faFolderOpen}
                title="Cancelled"
                className={`text-xl text-slate-400 cursor-pointer 
                transition-all ease-in-out duration-150 delay-75 
                hover:scale-110 hover:text-slate-600`}
                onClick={(e) => setOpen(true)}
            />
            <View value={value} open={open} parentSetOpen={setOpen} />
        </>
    );
});
