import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Transition } from "@headlessui/react";

export default memo(function Processing({ show }) {
    return (
        <Transition
            show={show}
            className={`w-full h-full bg-slate-200/50 absolute flex items-center justify-center z-50`}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="w-full h-full flex items-center justify-center animate-pulse bg-slate-400">
                <FontAwesomeIcon
                    icon={faSpinner}
                    className="animate-spin text-5xl"
                />
            </div>
        </Transition>
    );
});
