import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Offer from "./offer";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Offers({ event, control, errors }) {
    return (
        <div className="w-full md:w-4/5">
            <div className="grid md:grid-cols-4 xs:gap-y-2 md:gap-x-2">
                {control.data.offers.map((offer, idx) => (
                    <Offer
                        key={offer.id}
                        event={event}
                        value={offer}
                        control={control}
                        errors={errors}
                        idx={idx}
                        last={
                            control.data.offers.length >=
                                control.data.properties.max &&
                            control.data.offers.length - 1 === idx
                        }
                    />
                ))}
                {control.data.offers.length < control.data.properties.max && (
                    <div className="flex items-center justify-center border border-slate-200 rounded-md p-3">
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="h-10 cursor-pointer transition ease-in-out delay-100 duration-150 hover:scale-150 transform hover:-rotate-180"
                            onClick={control.add}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
