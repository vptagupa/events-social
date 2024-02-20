export default function Index({ children, props }) {
    return (
        <>
            <div className="text-black/80 bg-slate-200 w-full h-screen">
                {children}
            </div>
        </>
    );
}
