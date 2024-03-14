import { useTable } from "@/js/helpers/table";
import Body from "./body";

const INITIAL_PARAMS = {
    search: { query: "", statuses: "" },
    filter: false,
    page: 0,
    perPage: 10,
};

const Component = ({ event }) => {
    const {
        data,
        searching,
        search,
        setSearch,
        pagination,
        searchHandler,
        fetchData,
    } = useTable({
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
            search={search}
            searching={searching}
            pagination={pagination}
            setSearch={setSearch}
            handleSearch={searchHandler}
            fetchData={fetchData}
        />
    );
};

export default Component;
