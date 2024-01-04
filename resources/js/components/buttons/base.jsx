import Base from "../base";
import { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default forwardRef(({ progress = false, className, ...props }, ref) => {
    return (
        <Base
            render={<button />}
            ref={ref}
            {...props}
            className={`flex items-center justify-center transition ease-in-out delay-75 hover:scale-105 duration-300 rounded-lg shadow-md px-5 py-2 text-sm ${className}`}
        >
            {progress && (
                <FontAwesomeIcon
                    icon={faSpinner}
                    className="h-6 absolute text-slate-600 animate-spin"
                />
            )}

            {props.children}
        </Base>
    );
});
