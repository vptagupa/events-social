import File from "@/js/based/form/file";
import { Input } from "@/js/components/form";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { uid } from "uid";

import Name from "./name";

export default function Card({ setFiles, files, value, event }) {
    return (
        <div
            className={`relative w-full min-h-[200px] rounded-lg p-4 
            box-border gap-y-2 flex flex-col items-center justify-center border border-slate-300
            ${value?.error ? "bg-red-400/50" : ""}
            ${value?.uploaded ? "bg-green-400/50" : ""}
            `}
        >
            {value?.processing && (
                <div className="absolute animate-pulse bg-slate-300 w-full h-full z-10 flex items-center justify-center">
                    <FontAwesomeIcon
                        icon={faSpinner}
                        className="text-2xl animate-spin"
                    />
                </div>
            )}
            <div className="w-full">
                <File
                    title={
                        <span className="text-xs w-full truncate line-clamp-1">
                            {value?.file?.name ?? ""}
                        </span>
                    }
                    classNameContainer="!shadow-none !my-0 !p-0"
                    multiple
                    value={value?.file}
                    accept=".jpg,.jpeg,.pdf,.png"
                    onChange={(fileList) => {
                        const _files =
                            fileList[1] || fileList[0] ? fileList : [fileList];

                        setFiles(
                            files.concat(
                                Array.from(_files).map((file) => {
                                    return {
                                        id: uid(),
                                        name: "",
                                        participant: "",
                                        file: file,
                                        processing: false,
                                        uploaded: false,
                                        progress: 0,
                                    };
                                })
                            )
                        );
                    }}
                    remove={(file) => {
                        const destory = () => {
                            setFiles(files.filter((f) => value.id != f.id));
                        };

                        if (value.uploaded) {
                            value.processing = true;
                            setFiles([...files]);
                            axios
                                .delete(
                                    route(
                                        "organizer.events.certificates.destroy",
                                        {
                                            event: event.id,
                                            certificate: value.certificate.id,
                                        }
                                    )
                                )
                                .then((res) => {
                                    destory();
                                })
                                .catch((error) => {
                                    value.processing = false;
                                    setFiles([...files]);
                                });
                        } else {
                            destory();
                        }
                    }}
                />
            </div>
            {value?.certificate?.workshop && (
                <div className="w-full text-xs p-2 text-center text-slate-500 font-bold hover:text-slate-700">
                    <a
                        href={route(
                            "organizer.participant.index",
                            value.certificate.workshop.id
                        )}
                        target="_blank"
                        className="underline underline-offset-4 decoration-2 decoration-slate-100"
                    >
                        Linked profile
                    </a>
                </div>
            )}
            {value?.file && (
                <div className="w-full">
                    <Name event={event} setFiles={setFiles} value={value} />
                </div>
            )}
        </div>
    );
}
