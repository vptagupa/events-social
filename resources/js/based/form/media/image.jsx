import { useState, forwardRef, useLayoutEffect } from "react";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default forwardRef(function Image({ src, title, content }, ref) {
    const CustomZoomContent = ({
        buttonUnzoom, // default unzoom button
        modalState, // current state of the zoom modal: UNLOADED, LOADING, LOADED, UNLOADING
        img, // your image, prepped for zooming
        //onUnzoom,   // unused here, but a callback to manually unzoom the image and
        //   close the modal if you want to use your own buttons or
        //   listeners in your custom experience
    }) => {
        const [isLoaded, setIsLoaded] = useState(false);

        useLayoutEffect(() => {
            if (modalState === "LOADED") {
                setIsLoaded(true);
            } else if (modalState === "UNLOADING") {
                setIsLoaded(false);
            }
        }, [modalState]);

        const classCaption = isLoaded
            ? "zoom-caption zoom-caption--loaded"
            : "zoom-caption";

        return (
            <>
                {buttonUnzoom}

                <figure>
                    {img}
                    {(title || content) && (
                        <figcaption
                            className={`${classCaption} position mt-5 ml-0 w-1/4 bg-slate-900 text-white rounded-tr-xl rounded-br-xl p-2`}
                        >
                            {title && <div>{title}</div>}
                            {content && <div>{content}</div>}
                        </figcaption>
                    )}
                </figure>
            </>
        );
    };

    return (
        <Zoom ZoomContent={CustomZoomContent}>
            <div className="w-full flex items-center justify-center">
                <img src={src} className="w-1/2" />
            </div>
        </Zoom>
    );
});
