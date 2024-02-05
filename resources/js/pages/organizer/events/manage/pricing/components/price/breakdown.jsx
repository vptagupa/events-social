import { useEffect, useState, memo } from "react";
import { currency } from "@/js/helpers";

export default memo(function Breakdown({ event, price }) {
    const [data, set] = useState({});

    useEffect(() => {
        const controller = new AbortController();
        const get = async (price) => {
            const res = await axios.post(
                route("organizer.events.pricing.payment", {
                    event: event.id,
                }),
                {
                    price: event.is_free ? 0 : price,
                },
                { signal: controller.signal }
            );
            if (res?.data) {
                set(res.data);
            }
        };

        get(price);

        return () => controller.abort();
    }, [event, price]);

    const breakdown = [
        {
            title: "Total Charges",
            amount: currency(data?.total_fees ?? 0),
        },
        {
            title: "Tax " + data?.tax,
            amount: currency(data?.tax_amount ?? 0),
        },
        {
            title: "Final Price",
            className: "font-bold text-sm",
            amount: currency(data?.total ?? 0),
        },
    ];

    return (
        <div className="flex flex-col gap-y-1 mt-5">
            {breakdown.map((item, idx) => (
                <div
                    key={idx}
                    className={`flex items-center justify-between text-xs py-1 px-2 border border-slate-200 rounded-md
                    ${item?.className ?? ""}
                    `}
                >
                    <span>{item.title}: </span>
                    <span>{item.amount}</span>
                </div>
            ))}
        </div>
    );
});
