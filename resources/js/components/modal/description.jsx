import { Dialog } from "@headlessui/react";
import Base from "@/js/components/base";
import { forwardRef } from "react";

export default forwardRef((props, ref) => {
    return <Base render={<Dialog.Description />} ref={ref} {...props} />;
});
