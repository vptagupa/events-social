import Stat from "./stat";
import { stats } from "../../constant";
import { useState, useEffect } from "react";

export default function Stats({ event }) {
    const [data, setData] = useState(stats);

    useEffect(() => {
        axios
            .post(route("organizer.events.participants.statistics", event.id))
            .then((res) => {
                // setData()
            });
    }, []);

    return data.map((stat, idx) => <Stat key={idx} value={stat} />);
}
