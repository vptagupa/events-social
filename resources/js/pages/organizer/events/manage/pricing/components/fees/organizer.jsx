import { useEffect, useState, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Check from "../check";
import { currency } from "@/js/helpers";

export default memo(function OrganizerFees({ event }) {
    const [data, set] = useState({ data: [] });
    const total = data.data
        .filter((f) => f.select_active == 1)
        .reduce((s, f) => {
            s += parseFloat(f.select_price);
            return s;
        }, 0);

    const controller = new AbortController();
    const get = async (page = 1) => {
        const result = await axios.post(
            route("organizer.events.fees.list", event.id),
            {
                page,
            },
            {
                signal: controller.signal,
            }
        );
        if (result?.data) {
            set(result.data);
        }
    };

    useEffect(() => {
        get();

        return () => controller.abort();
    }, [event]);

    return (
        <>
            {data.data.map((fee) => (
                <div key={fee.id} className="flex gap-x-2">
                    <div className="w-[15%]">
                        <Check
                            url={route("organizer.events.fees.update", {
                                event: event.id,
                                fee: fee.id,
                            })}
                            value={fee.select_active}
                        />
                    </div>
                    <div className="w-[65%]">{fee.name}</div>
                    <div className="w-[20%] text-right">
                        {currency(fee?.select_price ?? 0)}
                    </div>
                </div>
            ))}
            <div className="flex items-center justify-between">
                <div className="text-xs">
                    {data?.links?.next && <>There's more</>}
                </div>
                <div className="text-end">
                    {data?.links?.prev && (
                        <FontAwesomeIcon
                            icon={faCaretLeft}
                            className="h-5 cursor-pointer font-bold hover-pointer text-blue-400"
                            onClick={(e) => get(data?.meta?.current_page - 1)}
                        />
                    )}
                    {data?.links?.next && (
                        <FontAwesomeIcon
                            icon={faCaretRight}
                            className="h-5 cursor-pointer font-bold hover-pointer text-blue-400"
                            onClick={(e) => get(data?.meta?.current_page + 1)}
                        />
                    )}
                </div>
            </div>
            <hr />
            <div className="flex items-center justify-between">
                <span className="font-bold">Total</span>
                <span>{currency(total)}</span>
            </div>
        </>
    );
});
