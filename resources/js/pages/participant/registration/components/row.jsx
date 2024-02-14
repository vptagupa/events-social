export default function Row({ name, value }) {
    return (
        <div className="w-full flex items-center justify-center gap-x-2 border-b border-slate-300">
            <div className="font-bold text-sm text-start w-[60%]">{name}</div>
            <div className="text-xs text-end w-[40%]">{value}</div>
        </div>
    );
}
