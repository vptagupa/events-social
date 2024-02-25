import { memo } from "react";

import Confirmed from "../../actions/confirmed";
import More from "../../actions/more";

export default memo(function Actions({ state, value, submit }) {
    return (
        <div className="flex items-center justify-end gap-x-2">
            <Confirmed
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
