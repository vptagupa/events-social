import { Input } from "@/js/components/form";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Flex({ value = 1, clickMinus, clickPlus, ...props }) {
    return (
        <div className="flex gap-x-2 items-center">
            <div className="grow text-center bg-slate-200 rounded-md p-2">
                {value}
            </div>
            <div className="w-10">
                <FontAwesomeIcon
                    onClick={clickMinus}
                    icon={faMinus}
                    className="block h-5 cursor-pointer text-red-700"
                />
                <FontAwesomeIcon
                    onClick={clickPlus}
                    icon={faPlus}
                    className="block h-5 cursor-pointer text-green-700"
                />
            </div>
        </div>
    );
}
