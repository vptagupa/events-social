import { memo } from "react";

import Confirmed from "../../actions/confirmed";
import More from "../../actions/more";

export default memo(function Actions({ state, value, submit }) {
    return (
        <div className="w-1/3 flex items-center justify-end gap-x-2">
            <Confirmed
                className={`${
                    state.processing.confirmed
                        ? "animate-pulse !text-green-800 !scale-150"
                        : ""
                }`}
                value={value}
                onClick={(e) =>
                    submit(
                        route(
                            "organizer.participants.payments.confirmed",
                            value.id
                        ),
                        {
                            amount: state.amount,
                            remarks: state.remarks,
                        },
                        "confirmed"
                    )
                }
            />
            <More
                cancelled={(e) =>
                    submit(
                        route(
                            "organizer.participants.payments.cancelled",
                            value.id
                        ),
                        {
                            remarks: state.remarks,
                        },
                        "cancelled"
                    )
                }
                rejected={(e) =>
                    submit(
                        route(
                            "organizer.participants.payments.rejected",
                            value.id
                        ),
                        {
                            remarks: state.remarks,
                        },
                        "rejected"
                    )
                }
                partial={(e) =>
                    submit(
                        route(
                            "organizer.participants.payments.partial",
                            value.id
                        ),
                        {
                            remarks: state.remarks,
                            amount: state.amount,
                        },
                        "partial"
                    )
                }
            />
        </div>
    );
});
