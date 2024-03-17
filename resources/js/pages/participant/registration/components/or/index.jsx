import { Form } from "@/js/components/form";
import { Input, Check } from "@/js/based/form";
import { ControlContext } from "../../context";
import { useContext, useState } from "react";

import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Or({ workshop }) {
    const [check, isCheck] = useState(false);
    const context = useContext(ControlContext);

    return (
        <div className="flex flex-col gap-y-3">
            <div className="w-full text-xs flex flex-col gap-y-2">
                <Form>
                    <div className="flex items-center justify-between">
                        <Check
                            title="Check"
                            onChange={(e) => isCheck(e.target.checked)}
                        />
                        <FontAwesomeIcon
                            title="Print Official Receipt"
                            icon={faReceipt}
                            className={`cursor-pointer text-lg text-slate-500 hover:scale-150 transition-all ease-in-out delay-100 duration-200`}
                            onClick={(e) => {
                                window.open(
                                    route(
                                        "organizer.events.participants.official-receipt",
                                        {
                                            workshop: workshop.id,
                                            event: workshop.event_id,
                                        }
                                    ),
                                    "_blank"
                                );
                            }}
                        />
                    </div>

                    <Input
                        title="OR No."
                        error={context.errors?.or_no}
                        value={context.control.or.or_no}
                        onChange={(e) =>
                            context.control.setOr({
                                ...context.control.or,
                                or_no: e.target.value,
                            })
                        }
                    />

                    {check && (
                        <>
                            <Input
                                title="Bank."
                                error={context.errors?.or_bank}
                                value={context.control.or.or_bank}
                                onChange={(e) =>
                                    context.control.setOr({
                                        ...context.control.or,
                                        or_bank: e.target.value,
                                    })
                                }
                            />
                            <Input
                                title="Check No."
                                error={context.errors?.or_check_no}
                                value={context.control.or.or_check_no}
                                onChange={(e) =>
                                    context.control.setOr({
                                        ...context.control.or,
                                        or_check_no: e.target.value,
                                    })
                                }
                            />
                            <Input
                                type="date"
                                title="Check Date"
                                error={context.errors?.or_check_date}
                                value={context.control.or.or_check_date}
                                onChange={(e) =>
                                    context.control.setOr({
                                        ...context.control.or,
                                        or_check_date: e.target.value,
                                    })
                                }
                            />
                        </>
                    )}

                    <Input
                        title="Amount"
                        error={context.errors?.or_amount}
                        value={context.control.or.or_amount}
                        onChange={(e) =>
                            context.control.setOr({
                                ...context.control.or,
                                or_amount: e.target.value,
                            })
                        }
                    />
                </Form>
            </div>
        </div>
    );
}
