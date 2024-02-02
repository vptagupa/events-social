import { useTable } from "@/js/helpers/table";
import Body from "./body";

const INITIAL_PARAMS = { search: "", filter: false, page: 0, perPage: 10 };

const Component = ({ route }) => {
    const { data, searching, setSearch, pagination, searchHandler } = useTable({
        initialParams: INITIAL_PARAMS,
        listRoute: route.list,
    });

    return (
        <Body
            route={route}
            data={data}
            searching={searching}
            pagination={pagination}
            setSearch={setSearch}
            handleSearch={searchHandler}
        />
    );
};

export default Component;
