import {
    AlertInfo,
    AlertSuccess,
    AlertDanger,
    AlertWarning,
} from "@/js/components/alerts";
export default function Notes({ value, type = "info", className = "" }) {
    const types = {
        info: <AlertInfo>{value}</AlertInfo>,
        success: <AlertSuccess>{value}</AlertSuccess>,
        danger: <AlertDanger>{value}</AlertDanger>,
        warning: <AlertWarning>{value}</AlertWarning>,
    };
    return <div className="block p-1 my-2">{types[type]}</div>;
}
