import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ file }) => {
    if (!file) {
        return "";
    }

    let url = "";
    if (file instanceof File && file.type.startsWith("image/")) {
        url = URL.createObjectURL(file);
    } else if (file?.is_image) {
        url = file.url;
    }

    if (url) {
        return <img src={url} className="w-full" />;
    }

    return (
        <FontAwesomeIcon
            className="h-12 text-center text-cyan-800"
            icon={faPhotoFilm}
        />
    );
};
