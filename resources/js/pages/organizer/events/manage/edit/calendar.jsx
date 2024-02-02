import {
    Date as CalendarDate,
    Time as CalendarTime,
    dateFormat,
} from "@/js/components/calendar";

import { useState } from "react";
import moment from "moment";
import { memo } from "react";

export default memo(function Calendar({ value, onChange }) {
    const [tab, setTab] = useState("date");

    return (
        <>
            <div className="flex items-center justify-start w-full gap-2 uppercase mb-5">
                <div
                    className={`text-xs border hover:bg-slate-300 hover:text-black/60 rounded-md px-3 py-1 cursor-pointer ${
                        tab == "date" ? "bg-slate-300 text-black/60" : ""
                    }`}
                    onClick={(e) => setTab("date")}
                >
                    Date
                </div>
                <div
                    className={`text-xs border hover:bg-slate-300 rounded-md px-3 py-1 cursor-pointer ${
                        tab == "time" ? "bg-slate-300" : ""
                    }`}
                    onClick={(e) => setTab("time")}
                >
                    Time
                </div>
            </div>

            {tab == "date" && (
                <CalendarDate
                    onChange={(e) => {
                        onChange(e);
                        setTab("time");
                    }}
                    date={moment(value, dateFormat).toDate()}
                />
            )}
            {tab == "time" && (
                <div className="mt-0">
                    <CalendarTime
                        onChange={onChange}
                        value={moment(value, dateFormat)}
                    />
                </div>
            )}
        </>
    );
});
