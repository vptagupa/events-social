import Stat from "./stat";
import { stats } from "../../constant";
import { useState, useEffect } from "react";

export default function Stats({ event }) {
    const [data, setData] = useState(stats);

    useEffect(() => {
        axios
            .get(route("organizer.events.statistics", event.id))
            .then((res) => {
                setData((data) =>
                    data.map((d) => {
                        d.value =
                            res.data[
                                d.title.toLowerCase().replace(/\s+/g, "_")
                            ];

                        return d;
                    })
                );
            });
    }, []);

    return data.map((stat, idx) => <Stat key={idx} value={stat} />);
}
