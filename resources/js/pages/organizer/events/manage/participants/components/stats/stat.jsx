export default function Stat({ value }) {
    return (
        <div
            title={value.title}
            className={`flex items-center justify-between p-3 gap-y-1 rounded-md text-white bg-gradient-to-r from-slate-500 to-slate-400 ${value.className}`}
        >
            <div className="font-bold w-12 text-slate-400/80 flex items-center justify-center">
                {value.icon}
            </div>
            <div className="text-end grow font-bold">
                <span className="block text-xs leading-3 text-slate-100/70">
                    {value.title}
                </span>
                <span className="block text-lg">{value.value}</span>
            </div>
        </div>
    );
}
