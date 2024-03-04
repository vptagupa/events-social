import { faFileInvoice, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import View from "./view";
import { useState, memo } from "react";

export default memo(function Action({ value }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <span
                className={`flex items-center justify-center gap-x-1 p-2 rounded-lg !text-xs cursor-pointer`}
            >
                <span
                    title="Open Confirmation Form"
                    onClick={(e) => setOpen(true)}
                    className="hover:decoration-purple-700 underline underline-offset-4  decoration-purple-400 decoration-2"
                >
                    {value.status}
                </span>
                {value.official_receipt?.url && (
                    <span
                        onClick={(e) =>
                            window.open(value.official_receipt.url, "_blank")
                        }
                        title="View Official Receipt"
                        className="hover:decoration-green-700 underline underline-offset-4  decoration-green-400 decoration-2"
                    >
                        #O.R.
                    </span>
                )}
            </span>
            <View value={value} open={open} parentSetOpen={setOpen} />
        </>
    );
});
