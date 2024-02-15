import { Input } from "@/js/components/form";
import {
    faArrowUpFromBracket,
    faMinus,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import LoadFile from "./media/load";
import { useState } from "react";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { DangerButton, InfoButton } from "@/js/components/buttons";

export default function File({
    title,
    error,
    remove,
    value,
    label,
    onChange,
    className = "",
    classNameIcon = "",
    classNameContainer = "ring-1 ring-slate-300 focus:outline-purple-300 disabled:bg-slate-300",
    ...props
}) {
    const [file, setFile] = useState(value);
    const ref = useRef();

    return (
        <div
            className={`p-4 w-full shadow-sm border-0  my-2  text-sm rounded-lg  ${classNameContainer}`}
        >
            <div className="block text-center">{title}</div>
            {label && <div className="block text-center text-xs">{label}</div>}

            {!file && (
                <div className="block p-1">
                    <Input
                        ref={ref}
                        type="file"
                        className={`hidden ${className}`}
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                            onChange(e.target.files[0]);
                        }}
                        {...props}
                    />
                    <div className="flex items-center justify-center m-3">
                        <FontAwesomeIcon
                            title={title}
                            icon={faArrowUpFromBracket}
                            className={`h-8 text-slate-300 hover-pointer ${classNameIcon}`}
                            onClick={(e) => ref.current.click()}
                        />
                    </div>
                </div>
            )}
            {file && (
                <div className="flex flex-col gap-y-2 items-center justify-center p-4">
                    <div className="w-full  flex items-center justify-center text-center bg-slate-200/70 border border-slate-200 rounded-md p-2">
                        <LoadFile file={file} />
                    </div>
                    <div className="flex items-center justify-center gap-x-2 text-xs">
                        <DangerButton
                            type="button"
                            className="!px-2 !rounded-md"
                            title="Remove"
                            onClick={(e) => {
                                setFile(null);
                                if (remove) remove();
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="text-sm font-extrabold"
                            />
                        </DangerButton>

                        {file?.url && (
                            <InfoButton
                                title="View"
                                type="button"
                                className="!px-2 !rounded-md"
                                onClick={(e) => {
                                    window.open(file.url, "_blank");
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faEye}
                                    className="text-sm font-extrabold"
                                />{" "}
                            </InfoButton>
                        )}
                    </div>
                </div>
            )}
            {error && (
                <div className="block text-danger text-xs text-center">
                    {error}
                </div>
            )}
        </div>
    );
}
