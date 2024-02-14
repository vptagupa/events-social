import Card from "./card";
import { useState, useEffect } from "react";
import { ControlContext } from "../../context";
import { useControl } from "../../control";

export default function Cards({ workshop }) {
    const control = useControl();
    useEffect(() => {
        const get = async () => {
            const res = await axios.post(
                route("participant.registrationForm", workshop.id)
            );
            control.setData(res.data);
        };

        get();
    }, []);

    return (
        <div className="w-full grid md:grid-cols-2 gap-4">
            <ControlContext.Provider value={control}>
                {control.data.map((flex) => (
                    <Card key={flex.flex} value={flex} />
                ))}
            </ControlContext.Provider>
        </div>
    );
}
