import { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

export default function Contract({ value, placeholder, onChange, ...props }) {
    const editor = useRef(null);
    const [content, setContent] = useState(value);

    const config = useMemo(
        () => ({
            readonly: false, // all options from https://xdsoft.net/jodit/docs/,
            placeholder: placeholder || "Start typings...",
        }),
        [placeholder]
    );

    return (
        <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={(newContent) => setContent(newContent)}
            onChange={onChange}
        />
    );
}
