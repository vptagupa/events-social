import {
    faPhotoFilm,
    faRotateLeft,
    faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, memo } from "react";

import Audio from "./audio";
import Video from "./video";
import Pdf from "./pdf";
import PdfViewer from "./pdf-viewer";
import Image from "./image";

export default memo(function Load({ file, ...props }) {
    const ref = useRef();

    if (!file) {
        return "";
    }

    const url = file instanceof File ? URL.createObjectURL(file) : file.url;

    if (file instanceof File) {
        if (file.type.startsWith("image/")) {
            return (
                <Image src={url} title={file?.title} content={file?.content} />
            );
        } else if (file.type.startsWith("audio/")) {
            return <Audio ref={ref} src={url} />;
        } else if (file.type.startsWith("video/")) {
            return <Video ref={ref} src={url} />;
        } else if (file.type.startsWith("application/pdf")) {
            if (props.pdf?.modal === false) {
                return <PdfViewer ref={ref} src={url} />;
            }
            return <Pdf ref={ref} src={url} />;
        }
    }

    if (file.is_image) {
        return <Image src={url} title={file?.title} content={file?.content} />;
    } else if (file.is_audio) {
        return <Audio ref={ref} src={url} />;
    } else if (file.is_video) {
        return <Video ref={ref} src={url} />;
    } else if (file.is_pdf) {
        if (props.pdf?.modal === false) {
            return <PdfViewer ref={ref} src={url} />;
        }
        return <Pdf ref={ref} src={url} />;
    }

    return (
        <FontAwesomeIcon
            className="h-12 text-center text-cyan-800"
            icon={faPhotoFilm}
        />
    );
});
