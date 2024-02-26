import Card from "./card";
import { PrimaryButton } from "@/js/components/buttons";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

export default function Upload({ event }) {
    const [files, setFiles] = useState([]);

    const upload = (value) => {
        if (value.processing) return;

        value.processing = true;

        setFiles([...files]);

        axios
            .postForm(
                route("organizer.events.certificates.store", event.id),
                value,
                {
                    onUploadProgress: (event) => {
                        value.progress = (event.progress * 100).toFixed(2);
                        setFiles([...files]);
                    },
                }
            )
            .then((res) => {
                value.error = false;
                value.processing = false;
                value.uploaded = true;
                // Do not update when no records found
                if (res.data?.workshop) {
                    value.name = res.data?.workshop?.participant?.name ?? "";
                    value.file = res.data?.file;
                    value.certificate = res.data;
                }

                setFiles([...files]);
            })
            .catch((error) => {
                value.processing = false;
                value.error = true;
                setFiles([...files]);
            });
    };

    const submit = () => {
        files
            .filter((v) => !v.uploaded)
            .map((value) => {
                upload(value);
            });
    };

    useEffect(() => {
        files
            .filter((v) => !v.uploaded && !v.error)
            .map((value) => {
                upload(value);
            });
    }, [files]);

    return (
        <>
            <div className="md:absolute flex items-center justify-end mb-2 top-0 right-2">
                <PrimaryButton type="button" onClick={submit}>
                    <FontAwesomeIcon
                        icon={faFloppyDisk}
                        className="text-xl mr-1"
                    />
                    SAVE
                </PrimaryButton>
            </div>

            <div className="flex flex-wrap items-center justify-start gap-5">
                {files.map((file, idx) => (
                    <div key={idx} className="w-1/6">
                        <Card
                            setFiles={setFiles}
                            value={file}
                            files={files}
                            event={event}
                        />
                    </div>
                ))}
                {files.filter((v) => !v.file).length <= 0 && (
                    <div className="w-1/6">
                        <Card setFiles={setFiles} files={files} event={event} />
                    </div>
                )}
            </div>
        </>
    );
}
