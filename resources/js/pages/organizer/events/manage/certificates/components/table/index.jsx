import { useTable } from "@/js/helpers/table";
import Body from "./body";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

const INITIAL_PARAMS = {
    search: {
        certificate_status: "",
        query: "",
    },
    filter: false,
    page: 0,
    perPage: 10,
};

const Component = ({ event }) => {
    const { default_certificate_status } = usePage().props;
    const { data, search, searching, setSearch, pagination, searchHandler } =
        useTable({
            initialParams: {
                ...INITIAL_PARAMS,
                search: {
                    ...INITIAL_PARAMS.search,
                    certificate_status: default_certificate_status,
                },
            },
            listRoute: route("organizer.events.certificates.list", event.id),
            name: "certificates",
        });

    useEffect(() => {
        searchHandler();
    }, [search.certificate_status]);

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
