import { useRef, useEffect, useState } from "react";

export default function Scrollable({ value, bottom, top }) {
    const ref = useRef();
    const [state, setState] = useState({});

    useEffect(() => {
        if (
            ref.current.scrollTop + ref.current.clientHeight ===
            ref.current.scrollHeight
        ) {
            bottom(true);
        }
    }, []);

    return (
        <>
            <div
                ref={ref}
                onScroll={(e) => {
                    const { scrollTop, scrollHeight, clientHeight } = e.target;

                    if (scrollTop === 0) {
                        top && top(true);
                    } else if (scrollTop + clientHeight >= scrollHeight - 10) {
                        bottom && bottom(true);
                    }
                    setState({
                        scrollTop,
                        clientHeight,
                        scrollHeight,
                    });
                }}
                className="h-[500px] overflow-y-auto"
                dangerouslySetInnerHTML={{
                    __html: value,
                }}
            />
            <div className="hidden">
                <pre>
                    scrollTop: {state?.scrollTop} <br />
                    clientHeight: {state?.clientHeight} <br />
                    scrollHeight: {state?.scrollHeight}
                </pre>
            </div>
        </>
    );
}
