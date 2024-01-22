import { useTable } from "@/js/helpers/table";
import Body from "./body";

const INITIAL_PARAMS = { search: "", filter: false, page: 0, perPage: 10 };

const Component = (props) => {
    const { data, searching, setSearch, pagination, searchHandler } = useTable({
        initialParams: INITIAL_PARAMS,
        listRoute: route("organizer.events.list"),
    });

    return (
        <Body
            data={data}
            searching={searching}
            pagination={pagination}
            setSearch={setSearch}
            handleSearch={searchHandler}
        />
    );
};

export default Component;
