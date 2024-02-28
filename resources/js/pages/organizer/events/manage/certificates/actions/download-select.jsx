import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/js/components/buttons";
import Event from "@/js/helpers/event";
import { useState } from "react";

export default function DownloadSelect({ event, value = [] }) {
    const [processing, setProcessing] = useState(false);
    return (
        <Button
            title="Download selected"
            type="button"
            className="!px-3 flex items-center justify-center gap-x-1 bg-slate-800 !text-white !shadow-none hover:!bg-slate-600"
            processing={processing}
            onClick={async (e) => {
                if (value.length <= 0) return;

                setProcessing(true);
                try {
                    const res = await axios.post(
                        route("organizer.events.certificates.download-select", {
                            event: event.id,
                            ids: JSON.stringify(value),
                        })
                    );

                    if (res?.data) {
                        Event.emit("certificates.reload");
                        window.open(
                            route("organizer.events.certificates.download", {
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
            <FontAwesomeIcon icon={faDownload} className="text-lg " />
            <span className="w-2 text-center">{value.length}</span>
        </Button>
    );
}
