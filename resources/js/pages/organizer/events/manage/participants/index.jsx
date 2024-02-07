import Main from "../index";
import Table from "./components/table";
import Sidebar from "./sidebar";

export default function Participants({ event, errors }) {
    return (
        <Main event={event}>
            <div className="min-h-[30rem] flex md:flex-row flex-col gap-y-2 md:gap-x-2 p-2">
                <div className="w-full md:w-4/5">
                    <Table event={event} />
                </div>
                <div className="w-full shrink-0 text-xs md:text-sm md:w-1/5 p-4 border border-slate-200 rounded-md bg-slate-200">
                    <Sidebar event={event} />
                </div>
            </div>
        </Main>
    );
}
