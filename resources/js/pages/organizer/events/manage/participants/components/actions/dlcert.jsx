import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

export default memo(function DownloadCert({ value }) {
    return (
        <>
            <div
                title="Download Certificate"
                className="cursor-pointer flex items-center justify-start gap-x-2 "
                onClick={async (e) => {
                    try {
                        if (
                            (value.workshops[0]?.certificates ?? []).length <= 0
                        )
                            return;

                        const res = await axios.post(
                            route(
                                "organizer.events.certificates.download-select",
                                {
                                    event: value.workshops[0].event.id,
                                    ids: JSON.stringify([
                                        value.workshops[0].certificates[0].id,
                                    ]),
                                }
                            )
                        );

                        if (res?.data) {
                            window.open(
                                route(
                                    "organizer.events.certificates.download",
                                    {
                                        event: value.workshops[0].event.id,
                                        ids: JSON.stringify(res?.data),
                                    }
                                )
                            );
                        }
                    } catch (error) {
                        console.log(error);
                    } finally {
                    }
                }}
            >
                <FontAwesomeIcon
                    icon={faCertificate}
                    className="h-5 text-primary hover-pointer group-hover:text-slate-200"
                />
                Download Certificate
            </div>
        </>
    );
});
