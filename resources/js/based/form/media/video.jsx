import { forwardRef } from "react";

export default forwardRef(function Video({ src }, ref) {
    return (
        <>
            <video
                ref={ref}
                controls
                src={src}
                className="rounded-lg opacity-75 w-full"
            >
                Your browser does not support the video tag.
            </video>
        </>
    );
});
