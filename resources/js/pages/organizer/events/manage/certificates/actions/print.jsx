import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Event from "@/js/helpers/event";
import { useState } from "react";

export default function Print({ event, value }) {
    const [processing, setProcessing] = useState(false);
    return (
        <FontAwesomeIcon
            title="Print"
            icon={faPrint}
            className="text-lg cursor-pointer"
            onClick={async (e) => {
                setProcessing(true);
                try {
                    const res = await axios.post(
                        route("organizer.events.certificates.print-select", {
                            event: event.id,
                            ids: JSON.stringify([value.id]),
                        })
                    );

                    if (res?.data) {
                        Event.emit("certificates.reload");
                        window.open(
                            route("organizer.events.certificates.printtable", {
                                event: event.id,
                                ids: JSON.stringify(res?.data),
                            })
                        );
                    }
                } catch (error) {
                } finally {
                    setProcessing(false);
                }
            }}
        />
    );
}
