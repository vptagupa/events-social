import { Button } from "@/js/components/buttons";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Attend from "../actions/attend";
import Attendance from "./attendance";

export default function Participant({ workshop, onChange }) {
    if (!workshop) return;

    return (
        <div className="relative w-full flex flex-col items-center justify-center gap-y-3">
            {(workshop?.attendance ?? []).length > 0 && (
                <div className="w-full flex items-center justify-center p-2 bg-slate-200 text-black rounded-lg text-base">
                    <Attendance data={workshop?.attendance ?? []} />
                </div>
            )}

            <div className="w-full flex items-center justify-center p-2 text-slate-200 rounded-lg text-base">
                <div className="w-1/2">Code:</div>
                <div className="w-1/2 text-end text-2xl">{workshop.code}</div>
            </div>
            <div className="w-full flex items-center justify-center p-2 bg-slate-200 rounded-lg text-black text-base">
                <div className="w-full text-end text-2xl">
                    {workshop.participant.name}
                </div>
            </div>
            <div className="w-full p-2 flex items-center justify-center bg-slate-200 rounded-lg text-black text-base">
                <div className="w-full text-end uppercase text-2xl">
                    {workshop.statuses[0]?.status}
                </div>
            </div>

            <div className="w-full mt-10 p-2 flex items-center justify-between gap-x-4 border-0 border-slate-200 rounded-lg text-base">
                <Button
                    onClick={(e) => onChange(null)}
                    type="button"
                    className="!shadow-none bg-gradient-to-b from-slate-400 to-slate-500 text-slate-300"
                >
                    <FontAwesomeIcon icon={faReply} className="text-3xl" />
                </Button>
                <Attend value={workshop} onChange={onChange} />
            </div>
        </div>
    );
}
