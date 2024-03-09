import { Scanner as Scan } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import axios from "axios";

export default function Scanner({ event, setWorkshop }) {
    const [error, setError] = useState(null);
    return (
        <Scan
            styles={{
                container: error && {
                    backgroundColor: "#ec4899",
                    border: "2px solid #ec4899",
                },
                video: error && {
                    backgroundColor: "#ec4899",
                    border: "2px solid #ec4899",
                },
            }}
            onResult={(result) => {
                axios
                    .post(
                        route("organizer.events.participants.verifier.verify", {
                            event: event.id,
                            workshop: "9b7bc635-736e-4e95-8269-778ecc4b07a5",
                        })
                    )
                    .then((res) => {
                        if (res?.data) {
                            setWorkshop(res.data);
                        }
                    })
                    .catch((error) => {
                        setError(error);
                        console.log(error);
                    });
            }}
            onError={(error) => console.log(error?.message)}
        />
    );
}
