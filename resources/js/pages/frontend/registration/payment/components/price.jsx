import { currency } from "@/js/helpers";
import { Link } from "@inertiajs/react";

export default function Price({ workshop }) {
    if (workshop.event.is_offer_package) {
        return (
            <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between">
                    <div>{workshop.offer.name}</div>
                    <div>{currency(parseFloat(workshop.offer.price))}</div>
                </div>

                <div className="w-full text-start text-xs">
                    <Link
                        href={route("registration.offer", workshop.uuid)}
                        className="underline text-blue-700"
                    >
                        Change Package
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-start justify-between w-full">
            <div>Price</div>
            <div>{currency(parseFloat(workshop.event.price))}</div>
        </div>
    );
}
