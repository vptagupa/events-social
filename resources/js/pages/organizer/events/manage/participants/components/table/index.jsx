import { useTable } from "@/js/helpers/table";
import Body from "./body";

const INITIAL_PARAMS = { search: "", filter: false, page: 0, perPage: 10 };

const Component = ({ event }) => {
    const { data, searching, setSearch, pagination, searchHandler } = useTable({
        initialParams: {
            ...INITIAL_PARAMS,
            with: { "workshops.certificates": true },
        },
        listRoute: route("organizer.events.participants.list", event.id),
    });

    return (
        <Body
            event={event}
            data={data}
            searching={searching}
            pagination={pagination}
            setSearch={setSearch}
            handleSearch={searchHandler}
        />
    );
};

export default Component;
