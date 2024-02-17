import Save from "./save";
import MarkAsConfirmed from "./markasconfirmed";
import MarkAsCancellled from "./markascancelled";

export default function Action({ workshop }) {
    return (
        <div className="flex items-center justify-end gap-x-2 mb-5">
            <Save workshop={workshop} />
            <MarkAsConfirmed workshop={workshop} />
            <MarkAsCancellled workshop={workshop} />
        </div>
    );
}
