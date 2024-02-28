import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/js/components/buttons";
import Event from "@/js/helpers/event";
import { useState } from "react";

export default function SendSelect({ event, value = [] }) {
    const [processing, setProcessing] = useState(false);
    return (
        <Button
            title="Send selected"
            type="button"
            className="!px-3 flex items-center justify-center gap-x-1 bg-slate-300 text-slate-500 !shadow-none hover:!bg-slate-400"
            processing={processing}
            onClick={async (e) => {
                if (processing) return;
                if (value.length <= 0) return;

                setProcessing(true);

                try {
                    const res = await axios.post(
                        route("organizer.events.certificates.send-select", {
                            event: event.id,
                            ids: JSON.stringify(value),
                        })
                    );

                    Event.emit("certificates.reload");
                } catch (error) {
                } finally {
                    setProcessing(false);
                }
            }}
        >
            <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
            <span className="w-2 text-center">{value.length}</span>
        </Button>
    );
}
