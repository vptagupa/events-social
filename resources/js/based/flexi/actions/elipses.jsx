import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Elipses({ children, active = false }) {
    return (
        <>
            <div className="relative flex flex-col items-center justify-center group">
                <FontAwesomeIcon
                    icon={faEllipsis}
                    className="h-6 cursor-pointer text-slate-600/60 group-hover:text-lg group-hover:text-slate-800"
                />

                <div
                    className={`absolute rounded-lg bg-slate-300 border-2 border-slate-400 font-bold p-2 gap-x-2 flex items-center justify-center ${
                        active ? "visible" : "invisible"
                    } group-hover:visible transistion-all  ease-in-out`}
                >
                    {children}
                </div>
            </div>
        </>
    );
}
