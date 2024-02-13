import Row from "../row";
import Note from "./note";
import moment from "moment";

export default function Statuses({ workshop }) {
    console.log(workshop);
    const date = (date) => {
        return date ? moment(date).format("MMMM Do YYYY, h:mm a") : "";
    };
    return (
        <div className="flex flex-col gap-y-3">
            <Row name="Invited" value={date(workshop.invited_at)} />
            <Row name="Notified" value={date(workshop.notified_at)} />
            <Row name="Invite Accepted" value={date(workshop.accepted_at)} />
            <Row name="Paid" value={date(workshop.submitted_at)} />
            <Row name="Submitted" value={date(workshop.submitted_at)} />
            <Row name="Payment Status" value={workshop.payment_status} />
            <Row name="Confirmed" value={date(workshop.confirmed_at)} />
            <Row name="Cancelled" value="" />
            <Note />
        </div>
    );
}
