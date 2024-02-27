import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryButton } from "@/js/components/buttons";
import Event from "@/js/helpers/event";
import { useState } from "react";

export default function PrintSelect({ event, value = [] }) {
    const [processing, setProcessing] = useState(false);
    return (
        <PrimaryButton
            title="Print selected"
            type="button"
            className="!px-3 flex items-center justify-center gap-x-1"
            processing={processing}
            onClick={async (e) => {
                setProcessing(true);
                try {
                    const res = await axios.post(
                        route("organizer.events.certificates.print-select", {
                            event: event.id,
                            ids: JSON.stringify(value),
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
        >
            <FontAwesomeIcon icon={faPrint} className="text-lg" />
            <span className="w-2 text-center">{value.length}</span>
        </PrimaryButton>
    );
}
