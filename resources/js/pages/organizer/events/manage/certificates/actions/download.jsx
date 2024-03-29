import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { router } from "@inertiajs/react";
import Event from "@/js/helpers/event";

export default function Download({ event, value }) {
    return (
        <FontAwesomeIcon
            icon={faDownload}
            title="Download"
            className="text-lg"
            onClick={async (e) => {
                try {
                    const res = await axios.post(
                        route("organizer.events.certificates.download-select", {
                            event: event.id,
                            ids: JSON.stringify([value.id]),
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
                    console.log(error);
                } finally {
                }
            }}
        />
    );
}
