import { Input } from "@/js/components/form";
import {
    faArrowUpFromBracket,
    faMinus,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import LoadFile from "./media/load";

export default function File({
    title,
    error,
    remove,
    value,
    className = "",
    classNameIcon = "",
    ...props
}) {
    const file = useRef();
    const media = file.current?.files[0] || value;
    return (
        <>
            <div className="block text-center text-xs">{title}</div>
            {!media && (
                <div className="block p-1">
                    <Input
                        ref={file}
                        type="file"
                        className={`hidden ${className}`}
                        {...props}
                    />
                    <div className="flex items-center justify-center m-3">
                        <FontAwesomeIcon
                            title={title}
                            icon={faArrowUpFromBracket}
                            className={`h-8 text-slate-300 hover-pointer ${classNameIcon}`}
                            onClick={(e) => file.current.click()}
                        />
                    </div>

                    {error && (
                        <span className="block text-danger text-xs text-center">
                            {error}
                        </span>
                    )}
                </div>
            )}
            {media && (
                <div className="flex flex-col gap-y-2 items-center justify-center p-4">
                    <div className="w-[80%] md:w-[70%] text-center bg-slate-200/70 border border-slate-200 rounded-md p-2">
                        <LoadFile file={media} />
                    </div>
                    <div>
                        <span
                            className="flex items-center gap-x-1 underline hover-pointer  text-xs float-right"
                            onClick={remove}
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
        </>
    );
}
