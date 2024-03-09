export default function Attendance({ data }) {
    console.log(data);
    return (
        <>
            <table className="w-full">
                <tbody>
                    {data.map((row) => (
                        <tr
                            key={row.id}
                            className="border-b last:border-b-0 border-slate-300 text-sm md:text-base"
                        >
                            <td className="text-end">{row.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
