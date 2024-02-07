import Stats from "./components/stats";

export default function Sidebar({ event }) {
    return (
        <div className="flex flex-col gap-y-3">
            <Stats />
        </div>
    );
}
