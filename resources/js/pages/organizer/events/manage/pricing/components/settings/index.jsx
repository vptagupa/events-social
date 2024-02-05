import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Check from "../check";

export default function Settings({ event }) {
    const [data, set] = useState({ data: [] });

    const get = async (page = 1) => {
        const result = await axios.post(
            route("organizer.events.settings.list", event.id),
            {
                page,
            }
        );
        if (result?.data) {
            set(result.data);
        }
    };

    useEffect(() => {
        get();
    }, []);

    return (
        <>
            {data.data.map((setting) => (
                <div key={setting.id} className="flex w-full gap-x-2 text-xs">
                    <div className="w-[15%]">
                        <Check
                            url={route("organizer.events.settings.update", {
                                event: event.id,
                                setting: setting.id,
                            })}
                            value={setting.select_active}
                        />
                    </div>
                    <div className="w-[85%]">{setting.name}</div>
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
        </>
    );
}
