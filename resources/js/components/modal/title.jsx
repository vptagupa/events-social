import { Dialog } from "@headlessui/react";
import Base from "@/js/components/base";
import { forwardRef } from "react";

export default forwardRef((props, ref) => {
    return (
        <Base
            render={<Dialog.Title />}
            ref={ref}
            _class="mb-2 pb-2 border-b border-solid"
            {...props}
        />
    );
});
