import { Modal, Title } from "@/js/components/modal";
import {
    Date as CalendarDate,
    Time as CalendarTime,
    dateFormat,
} from "@/js/components/calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Close from "../components/close";
import moment from "moment";
import { memo } from "react";

export default memo(function Date({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState("date");

    return (
        <>
            <span
                onClick={(e) => setOpen(true)}
                className="bg-none flex items-center gap-x-1 shadow-none cursor-pointer hover:font-medium"
            >
                <span className="underline">
                    {moment(value, dateFormat).format(dateFormat)}
                </span>
                <FontAwesomeIcon icon={faPen} className="h-3" />
            </span>
            <Modal
                open={open}
                className={`flex items-center justify-center w-auto text-sm
                `}
            >
                <Close click={(e) => setOpen(false)} />
                <Title className="p-2">
                    <div className="flex items-center justify-start w-full gap-2 uppercase">
                        <div
                            className={`border hover:primary rounded-md px-3 py-1 cursor-pointer ${
                                tab == "date" ? "primary" : ""
                            }`}
                            onClick={(e) => setTab("date")}
                        >
                            Date
                        </div>
                        <div
                            className={`border hover:primary rounded-md px-3 py-1 cursor-pointer ${
                                tab == "time" ? "primary" : ""
                            }`}
                            onClick={(e) => setTab("time")}
                        >
                            Time
                        </div>
                    </div>
                </Title>

                <div
                    className={`transition-all ease-in-out
                ${tab == "date" ? "h-[18rem]" : "h-[33rem]"}`}
                >
                    {tab == "date" && (
                        <CalendarDate
                            onChange={onChange}
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
                </div>
            </Modal>
        </>
    );
});
