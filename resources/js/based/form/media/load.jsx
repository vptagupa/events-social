import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Audio from "./audio";
import Video from "./video";
import { useRef } from "react";

export default ({ file }) => {
    const ref = useRef();

    if (!file) {
        return "";
    }

    const url = file instanceof File ? URL.createObjectURL(file) : file.url;

    if (file instanceof File) {
        if (file.type.startsWith("image/")) {
            return <img src={url} className="w-1/2" />;
        } else if (file.type.startsWith("audio/")) {
            return <Audio ref={ref} src={url} />;
        } else if (file.type.startsWith("video/")) {
            return <Video ref={ref} src={url} />;
        }
    }

    if (file.is_image) {
        return <img src={url} className="w-1/2" />;
    } else if (file.is_audio) {
        return <Audio ref={ref} src={url} />;
    } else if (file.is_video) {
        return <Video ref={ref} src={url} />;
    }

    return (
        <FontAwesomeIcon
            className="h-12 text-center text-cyan-800"
            icon={faPhotoFilm}
        />
    );
};
