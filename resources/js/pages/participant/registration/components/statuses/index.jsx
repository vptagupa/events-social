import Row from "../row";
import Note from "./note";
import moment from "moment";
import { dateDisplay } from "@/js/helpers";

export default function Statuses({ workshop }) {
    return (
        <div className="flex flex-col gap-y-3">
            <Row name="Invited" value={dateDisplay(workshop.invited_at)} />
            {workshop.invited_at && (
                <Row
                    name="Invite Accepted"
                    value={dateDisplay(workshop.accepted_at)}
                />
            )}

            <Row name="Notified" value={dateDisplay(workshop.notified_at)} />
            <Row name="Paid" value={dateDisplay(workshop.payment_at)} />
            <Row name="Submitted" value={dateDisplay(workshop.submitted_at)} />
            <Row name="Payment Status" value={workshop.payment_status} />
            <Row name="Confirmed" value={dateDisplay(workshop.confirmed_at)} />
            <Row name="Cancelled" value={dateDisplay(workshop.cancelled_at)} />
            <Note value={workshop.note} />
        </div>
    );
}
