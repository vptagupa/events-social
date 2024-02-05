export default function Breakdown({ price, payment }) {
    return (
        <div className="flex flex-col gap-y-1 mt-5">
            <div className="flex items-center justify-between text-xs">
                <span>Total Charges: </span>
                <span>99.0</span>
            </div>
            <div className="flex items-center justify-between text-xs">
                <span>Tax: </span>
                <span>99.0</span>
            </div>
            <div className="flex items-center justify-between text-sm font-bold">
                <span className="">Final Price: </span>
                <span>99.0</span>
            </div>
        </div>
    );
}
