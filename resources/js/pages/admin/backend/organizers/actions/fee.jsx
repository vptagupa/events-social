import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@inertiajs/react";

export default function Fee({ value, ...props }) {
    return (
        <Link href={route("organizer.fees.index", value)} title="Visit Fees">
            <FontAwesomeIcon
                icon={faFileInvoiceDollar}
                className="h-5 text-green-300 hover:text-green-600 hover:scale-105 transition-all duration-100"
            />
        </Link>
    );
}
