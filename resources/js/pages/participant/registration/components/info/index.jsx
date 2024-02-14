import Row from "../row";

export default function Infos({ workshop }) {
    return (
        <div className="flex flex-col gap-y-3">
            <Row name="Code" value={workshop.code} />
            <Row name="Email Address" value={workshop.participant.email} />
        </div>
    );
}
