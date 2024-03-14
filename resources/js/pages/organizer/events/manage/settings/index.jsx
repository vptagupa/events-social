import Main from "../index";
import OfficialReceipt from "./components/or";

export default function Settings({ event }) {
    return (
        <Main event={event}>
            <div className="grid grid-cols-3 gap-x-2">
                <div className="p-4 border border-slate-300 rounded-lg">
                    <h2 className="font-bold">Official Receipt</h2>
                    <hr />
                    <br />
                    <OfficialReceipt event={event} />
                </div>
            </div>
        </Main>
    );
}
