import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Model({
    open = false,
    onClose,
    className = "xs:w-[90%] xs:max-w-lg p-3",
    ...props
}) {
    const cancelButtonRef = useRef(null);
    let _onClose = onClose;
    if (!_onClose) {
        _onClose = () => false;
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[99999]"
                initialFocus={cancelButtonRef}
                onClose={_onClose}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center xs:items-center xs:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className={`${className} relative transform overflow-hidden text-left shadow-xl transition-all xs:my-8 bg-white rounded-lg`}
                            >
                                <div>{props.children}</div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
