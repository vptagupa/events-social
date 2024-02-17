export default function Actions({ workshop }) {
    const statuses = {
        confirmed: {
            class: "bg-green-700",
            title: "Confirmed",
        },
        cancelled: {
            class: "bg-red-700",
            title: "Cancelled",
        },
        submitted: {
            class: "bg-blue-700",
            title: "Form Submitted",
        },
        payment_submitted: {
            class: "bg-teal-700",
            title: "Payment Submitted",
        },
        in_progress: {
            class: "bg-amber-700",
            title: "In-Progress",
        },
    };

    let status =
        statuses[
            workshop.statuses[0]?.status.replace(/\s+/g, "_").toLowerCase()
        ];

    status = status?.title ? status : statuses.in_progress;

    return (
        <>
            <span
                className={`uppercase text-lg px-2 rounded-lg text-white ${status.class}`}
            >
                {status.title}
            </span>
        </>
    );
}
