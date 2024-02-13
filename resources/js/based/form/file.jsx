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
                    <div className="w-[100%] md:w-1/2 flex items-center justify-center text-center bg-slate-200/70 border border-slate-200 rounded-md p-2">
                        <LoadFile file={file} />
                    </div>
                    <div>
                        <span
                            className="flex items-center gap-x-1 underline hover-pointer  text-xs float-right"
                            onClick={(e) => {
                                setFile(null);
                                if (remove) remove();
                            }}
                        >
                            <FontAwesomeIcon
                                title="Remove"
                                icon={faTrashAlt}
                                className="h-3 font-extrabold text-danger"
                            />
                            Remove
                        </span>
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
