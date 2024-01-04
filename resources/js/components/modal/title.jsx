import { Dialog } from "@headlessui/react";
import Base from "@/js/components/base";
import { forwardRef } from "react";

export default forwardRef(({ className, ...props }, ref) => {
    return (
        <Base
            render={<Dialog.Title />}
            ref={ref}
            {...props}
            className={`mb-2 pb-2 border-b border-solid ${className}`}
        />
    );
});
