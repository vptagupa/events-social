import Settings from "./components/settings";
import Fees from "./components/fees";

export default function Sidebar({ event, payment }) {
    return (
        <div className="flex flex-col gap-y-3">
            <Settings event={event} />
            <Fees event={event} payment={payment} />
        </div>
    );
}
