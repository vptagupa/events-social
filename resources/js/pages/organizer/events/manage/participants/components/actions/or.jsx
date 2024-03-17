import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentEditable from "react-contenteditable";
import { useState, useEffect, memo } from "react";

export default memo(function OfficialReceipt({ value }) {
    const [processing, setProcessing] = useState(null);
    const [error, setError] = useState(false);
    const [val, setValue] = useState(value.workshops[0].or_no ?? "");

    useEffect(() => {
        setValue(value.workshops[0].or_no ?? "");
    }, [value]);

    return (
        <div
            className={`flex group items-center justify-start gap-x-1 
            relative before:content-[""] before:transition-all before:delay-150 before:duration-300
            before:absolute before:left-[0.7rem] before:bottom-0 before:border-opacity-50  before:w-full 
            ${processing ? " before:border-b before:border-slate-400" : ""}
            ${
                processing === false
                    ? " before:border-b before:border-green-600"
                    : "before:border-b before:border-slate-400"
            }
            ${error ? " before:border-b before:border-red-600" : ""}`}
        >
            <div className="w-[10%] group-focus:bg-slate-500">
                <FontAwesomeIcon
                    title="Official Receipt"
                    icon={faReceipt}
                    className={`cursor-pointer text-slate-300 hover:text-slate-500 transition-all ease-in-out delay-100 duration-200`}
                    onClick={(e) => {
                        window.open(
                            route(
                                "organizer.events.participants.official-receipt",
                                {
                                    workshop: value.workshops[0].id,
                                    event: value.workshops[0].event_id,
                                }
                            ),
                            "_blank"
                        );
                    }}
                />
            </div>
            <div className="w-[90%] group-focus:w-full">
                <ContentEditable
                    html={val}
                    required={false}
                    placeholder="..."
                    disabled={false} // use true to disable editing
                    onChange={async (e) => {
                        setValue(e.target.value);
                        setProcessing(true);
                        try {
                            await axios.patch(
                                route(
                                    "organizer.participant.update-orno",
                                    value.workshops[0].id
                                ),
                                {
                                    orno: e.target.value,
                                }
                            );
                            setProcessing(false);
                        } catch (error) {
                            setError(true);
                        } finally {
                            setProcessing(false);
                        }
                    }} // handle innerHTML change
                    tagName="div"
                    className={`w-full p-2 focus:outline-none border-b-0`}
                />
            </div>
        </div>
    );
});
