import { memo } from "react";

export default memo(function Status({ value }) {
    return (
        <div
            className={`w-full h-full bg-slate-600/50 absolute flex items-center justify-center z-50`}
        >
            <span
                className={`transform -rotate-45 uppercase text-7xl font-bold pt-4 pb-7 px-7 ${value.status_classes} rounded-xl`}
            >
                {value.status}
                <p className="!text-sm text-end">{value.remarks}</p>
            </span>
        </div>
    );
});
