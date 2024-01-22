import { Input } from "@/js/components/form";

export default function Time({ onChange, value: moment }) {
    const minutes = ["01", "15", "30", "45"];
    const is = (hour, minute) =>
        moment.format("h") == hour && moment.format("mm") == minute;
    const isCustom = (hour) => moment.format("h") == hour;
    const isA = (hour, a) =>
        moment.format("h") == hour && moment.format("a") == a;

    return (
        <>
            <ol className="text-sm">
                <li className="overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-300 scrollbar-track-gray-200">
                    <ol>
                        {new Array(12)
                            .fill(minutes, 0, 12)
                            .map((minutes, hourIdx) => {
                                const hour = hourIdx + 1;
                                const _isCustom = isCustom(hour);
                                const _isAM = isA(hour, "am");
                                const _isPM = isA(hour, "pm");

                                return (
                                    <li
                                        key={hourIdx}
                                        className="p-0 flex gap-2 items-center cursor-pointer"
                                    >
                                        <ol>
                                            <li className="float-left py-2 m-1  w-10 text-sm primary-less text-slate-200 text-center">
                                                {hour}h
                                            </li>
                                            {minutes.map((minute, idx) => {
                                                const _is = is(hour, minute);
                                                return (
                                                    <li
                                                        key={idx}
                                                        className={`float-left py-2 px-3 m-1 border-0 ring-1 
                                                            rounded-lg  hover:primary-less 
                                                          hover:text-slate-200 hover:ring-primary
                                                        ${
                                                            _is
                                                                ? "primary-less ring-primary text-slate-200"
                                                                : "ring-slate-400 "
                                                        }`}
                                                        onClick={(e) =>
                                                            onChange(
                                                                moment
                                                                    .hour(hour)
                                                                    .minutes(
                                                                        minute
                                                                    )
                                                            )
                                                        }
                                                    >
                                                        {minute}
                                                    </li>
                                                );
                                            })}
                                            <li
                                                className={`float-left py-1 px-1  border-0`}
                                            >
                                                <Input
                                                    type="number"
                                                    className="!w-14 text-center"
                                                    value={
                                                        _isCustom
                                                            ? moment
                                                                  .hour(hour)
                                                                  .minutes()
                                                            : ""
                                                    }
                                                    onChange={(e) =>
                                                        onChange(
                                                            moment
                                                                .hour(hour)
                                                                .minutes(
                                                                    e.target
                                                                        .value
                                                                )
                                                        )
                                                    }
                                                />
                                            </li>
                                            <li
                                                className={`float-left py-2 px-3 m-1 text border-0 ring-1 
                                                rounded-lg  hover:primary-less 
                                              hover:text-slate-200 hover:ring-primary 
                                              ${
                                                  _isAM
                                                      ? "primary-less ring-primary text-slate-200"
                                                      : "ring-slate-400 "
                                              }`}
                                                onClick={(e) =>
                                                    onChange(moment.hour(hour))
                                                }
                                            >
                                                AM
                                            </li>
                                            <li
                                                className={`float-left py-2 px-3 m-1  border-0 ring-1 
                                                rounded-lg  hover:primary-less 
                                              hover:text-slate-200 hover:ring-primary
                                              ${
                                                  _isPM
                                                      ? "primary-less ring-primary text-slate-200"
                                                      : "ring-slate-400 "
                                              }`}
                                                onClick={(e) =>
                                                    onChange(
                                                        moment.hour(hour + 12)
                                                    )
                                                }
                                            >
                                                PM
                                            </li>
                                        </ol>
                                    </li>
                                );
                            })}
                    </ol>
                </li>
            </ol>
        </>
    );
}
