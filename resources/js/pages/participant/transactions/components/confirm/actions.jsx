import { memo } from "react";

import Confirmed from "../../actions/confirmed";
import More from "../../actions/more";

export default memo(function Actions({ value, submit }) {
    return (
        <div className="flex items-center justify-end gap-x-2">
            <Confirmed
                onClick={(e) =>
                    submit(
                        route(
                            "organizer.participants.payments.confirmed",
                            value.id
                        ),
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
                        "cancelled"
                    )
                }
                rejected={(e) =>
                    submit(
                        route(
                            "organizer.participants.payments.rejected",
                            value.id
                        ),
                        "rejected"
                    )
                }
                partial={(e) =>
                    submit(
                        route(
                            "organizer.participants.payments.partial",
                            value.id
                        ),
                        "partial"
                    )
                }
            />
        </div>
    );
});
