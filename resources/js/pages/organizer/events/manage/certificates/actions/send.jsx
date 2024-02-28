import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Event from "@/js/helpers/event";
import { useState } from "react";

export default function Send({ event, value }) {
    const [processing, setProcessing] = useState(false);

    return (
        <FontAwesomeIcon
            title="Send"
            icon={faPaperPlane}
            className={`text-lg cursor-pointer ${
                processing ? "animate-bounce" : ""
            }`}
            onClick={async (e) => {
                if (processing) return;

                setProcessing(true);
                try {
                    await axios.post(
                        route("organizer.events.certificates.send-select", {
                            event: event.id,
                            ids: JSON.stringify([value.id]),
                        })
                    );
                    Event.emit("certificates.reload");
                } catch (error) {
                } finally {
                    setProcessing(false);
                }
            }}
        />
    );
}
