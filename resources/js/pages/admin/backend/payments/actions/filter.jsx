import Statuses from "../components/statuses";
import Events from "../components/events";
import DateRange from "../components/daterange";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { SecondaryButton } from "@/js/components/buttons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/js/components/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Filter({ searching }) {
    return (
        <div className="w-full flex xs:max-sm:flex-col items-center justify-between gap-x-2">
            <div className="w-full md:w-1/3 z-40">
                <DateRange />
            </div>
            <div className="w-full xs:max-sm:gap-y-2 md:w-2/3 flex xs:max-sm:flex-col items-center justify-end gap-x-2">
                <div className="w-full md:w-60 z-30">
                    <Events />
                </div>
                <div className="w-full md:w-40 z-20">
                    <Statuses />
                </div>
                <div className="w-full md:w-2/5 flex items-center">
                    <Input
                        type="text"
                        placeholder="Search by code, email and name"
                        className="border-r-0 rounded-r-none lg:w-96 !shadow-md !shadow-slate-200"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <SecondaryButton
                        onClick={(e) => handleSearch()}
                        className="shadow-none border border-slate-300 rounded-l-none"
                    >
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className={`h-5 ${
                                searching ? "animate-pulse text-amber-300" : ""
                            }`}
                        />
                    </SecondaryButton>
                </div>
            </div>
        </div>
    );
}
