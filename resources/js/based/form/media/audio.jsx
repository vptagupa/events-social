import {
    faCirclePlay,
    faPauseCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useState } from "react";

export default forwardRef(function Audio({ src }, ref) {
    const [play, setPlay] = useState(false);
    return (
        <div>
            <audio src={src} ref={ref} className="hidden"></audio>
            <FontAwesomeIcon
                icon={!play ? faCirclePlay : faPauseCircle}
                className="text-3xl cursor-pointer hover:text-blue-700"
                onClick={(e) => {
                    if (ref.current?.paused) {
                        setPlay(true);
                        ref.current.play();
                    } else {
                        setPlay(false);
                        ref.current.pause();
                    }
                }}
            />
        </div>
    );
});
