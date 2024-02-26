import Main from "../index";
import Tabs from "./components/tabs";

export default function Certificates({ event }) {
    return (
        <Main event={event}>
            <Tabs event={event} />
        </Main>
    );
}
