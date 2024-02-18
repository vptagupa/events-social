import { useRef, useEffect } from "react";

export default function Scrollable({ value, bottom, top }) {
    const ref = useRef();

    useEffect(() => {
        if (
            ref.current.scrollTop + ref.current.clientHeight ===
            ref.current.scrollHeight
        ) {
            bottom(true);
        }
    }, []);

    return (
        <div
            ref={ref}
            onScroll={(e) => {
                const { scrollTop, scrollHeight, clientHeight } = e.target;

                if (scrollTop === 0) {
                    top && top(true);
                } else if (scrollTop + clientHeight >= scrollHeight) {
                    bottom && bottom(true);
                }
            }}
            className="h-[500px] overflow-y-auto"
            dangerouslySetInnerHTML={{
                __html: value,
            }}
        />
    );
}
