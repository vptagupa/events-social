import { useTable } from "@/js/helpers/table";
import Body from "./body";
import moment from "moment";

const INITIAL_PARAMS = {
    search: {
        date: {
            startDate: moment(new Date()).subtract(30, "days").toDate(),
            endDate: new Date(),
            key: "selection",
        },
        event: "",
        query: "",
    },
    filter: false,
    page: 0,
    perPage: 10,
};

const Component = (props) => {
    const { data, searching, search, setSearch, pagination, searchHandler } =
        useTable({
            initialParams: INITIAL_PARAMS,
            listRoute: route("organizer.participants.payments.list"),
            name: "payments",
        });

    return (
        <Body
            data={data}
            search={search}
            searching={searching}
            pagination={pagination}
            setSearch={setSearch}
            handleSearch={searchHandler}
        />
    );
};

export default Component;
