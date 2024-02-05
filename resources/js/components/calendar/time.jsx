import { Input } from "@/js/components/form";
import { memo } from "react";

export default memo(function Time({ onChange, value: moment }) {
    const minutes = ["01", "15", "30", "45"];
    const isHour = (hour) => moment.format("h") == hour;
    const is = (hour, minute) =>
        moment.format("h") == hour && moment.format("mm") == minute;
    const isCustom = (hour) => moment.format("h") == hour;
    const isA = (hour, a) =>
        moment.format("h") == hour && moment.format("a") == a;

    const boxClass =
        "p-1 cursor-pointer border text-center border-slate-200 w-7 group-hover/item:bg-white group-hover/item:text-black group-hover/item:border-blue-500 transition-all ease-out duration-150 delay-100";
    console.log("t");
    return (
        <div className="flex flex-col gap-1 text-xs">
            {new Array(12).fill(minutes, 0, 12).map((minutes, hourIdx) => {
                const hour = hourIdx + 1;
                const _isHour = isHour(hour);
                const _isCustom = isCustom(hour);
                const _isAM = isA(hour, "am");
                const _isPM = isA(hour, "pm");

                return (
                    <div key={hourIdx} className="flex gap-x-1 group/item">
                        <div
                            className={`${boxClass} ${
                                _isHour
                                    ? "border-none bg-blue-500 text-white"
                                    : ""
                            } group-hover/item:!bg-blue-500 group-hover/item:!text-white`}
                        >
                            {hour}
                        </div>
                        <div className="text-center w-2">:</div>
                        {minutes.map((minute, idx) => {
                            const _is = is(hour, minute);
                            return (
                                <div
                                    key={idx}
                                    className={`${boxClass} ${
                                        _is
                                            ? "border-none bg-blue-500 text-white"
                                            : ""
                                    } hover:border-none hover:!bg-blue-500 hover:!text-white`}
                                    onClick={(e) =>
                                        onChange(
                                            moment.hour(hour).minutes(minute)
                                        )
                                    }
                                >
                                    {minute}
                                </div>
                            );
                        })}
                        <div>
                            <Input
                                type="number"
                                max="60"
                                className="!w-12 text-center !text-xs !p-1"
                                value={
                                    _isCustom ? moment.hour(hour).minutes() : ""
                                }
                                onChange={(e) =>
                                    onChange(
                                        moment
                                            .hour(hour)
                                            .minutes(e.target.value)
                                    )
                                }
                            />
                        </div>
                        <div className="text-center w-2">:</div>
                        <div
                            className={`${boxClass} ${
                                _isAM
                                    ? "border-none bg-blue-500 text-white"
                                    : ""
                            } hover:border-none hover:!bg-blue-500 hover:!text-white`}
                            onClick={(e) => onChange(moment.hour(hour))}
                        >
                            AM
                        </div>
                        <div
                            className={`${boxClass} ${
                                _isPM
                                    ? "border-none bg-blue-500 text-white"
                                    : ""
                            } hover:border-none hover:!bg-blue-500 hover:!text-white`}
                            onClick={(e) => onChange(moment.hour(hour + 12))}
                        >
                            PM
                        </div>
                    </div>
                );
            })}
        </div>
    );
});
