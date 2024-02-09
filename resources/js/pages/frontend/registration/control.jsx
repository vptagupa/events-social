import { useState } from "react";

export const useControl = (flexis = {}) => {
    const [data, setData] = useState(flexis);

    return { data };
};
