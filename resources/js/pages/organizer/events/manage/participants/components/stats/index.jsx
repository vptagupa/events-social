import Stat from "./stat";
import { stats } from "../../constant";

export default function Stats() {
    return stats.map((stat, idx) => <Stat key={idx} value={stat} />);
}
