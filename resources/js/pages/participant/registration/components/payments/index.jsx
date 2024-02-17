import Row from "../row";
import Trans from "./trans";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function Payment({ workshop }) {
    const [data, set] = useState({ data: [] });

    const controller = new AbortController();
    const get = async (page = 1) => {
        const result = await axios.post(
            route("organizer.participant.transactions", workshop.id),
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
    }, [workshop]);

    return (
        <div className="flex flex-col gap-y-3">
            <Row name="Payments Logs" value="" />
            <div className="w-full text-xs pl-5 flex flex-col gap-y-2">
                {data.data.map((trans) => (
                    <Trans key={trans.id} value={trans} />
                ))}
            </div>
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
        </div>
    );
}
