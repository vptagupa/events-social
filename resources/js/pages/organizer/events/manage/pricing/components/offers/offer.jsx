import { Input, Textarea } from "@/js/based/form";
import { Form } from "@/js/components/form";
import { PrimarySwitch } from "@/js/components/switch";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import Breadown from "../price/breakdown";

export default memo(function Offer({
    event,
    value,
    last = false,
    control,
    idx,
    errors,
}) {
    const error = (idx, key) => {
        const field = "offers." + idx + "." + key;
        if (errors[field]) {
            return errors[field].replace(field, key);
        }
    };

    return (
        <div
            className={`border border-slate-200 rounded-md p-3 ${
                value.active
                    ? ""
                    : "bg-slate-200/80 transition-all ease-in-out delay-75 duration-100"
            }`}
        >
            <Form>
                <div className="flex items-center justify-end gap-x-2">
                    <PrimarySwitch
                        title={value.active ? "Deactive" : "Activate"}
                        checked={value.active}
                        handler={(active) => control.setActive(value, active)}
                    />

                    {last && (
                        <FontAwesomeIcon
                            title="Remove"
                            icon={faMinus}
                            className="h-6 cursor-pointer"
                            onClick={(e) => control.remove(value)}
                        />
                    )}
                </div>
                <Input
                    error={error(idx, "name")}
                    title={"Name"}
                    value={value.name}
                    onChange={(e) => {
                        control.change(value, "name", e.target.value);
                    }}
                />
                <Textarea
                    error={error(idx, "description")}
                    title={"Description"}
                    value={value.description}
                    onChange={(e) => {
                        control.change(value, "description", e.target.value);
                    }}
                    rows="10"
                />
                <Input
                    type="number"
                    title={"Price"}
                    error={error(idx, "price")}
                    disabled={event.is_free}
                    value={event.is_free ? 0 : value.price}
                    onChange={(e) => {
                        control.change(value, "price", e.target.value);
                    }}
                />
                <Breadown event={event} price={value.price} />
            </Form>
        </div>
    );
});
