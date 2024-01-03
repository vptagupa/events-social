import axios from "axios";
import { useState, useCallback, useEffect, useRef } from "react";
import { usePagination } from "@table-library/react-table-library/pagination";
import { router } from "@inertiajs/react";
import Event from "@/js/helpers/event";

export const useTable = ({ initialParams, listRoute: _listRoute, name }) => {
    const [routes, setRoutes] = useState({
        listRoute: _listRoute,
    });
    const [search, setSearch] = useState(initialParams.search);
    const [data, setData] = useState({
        nodes: [],
        pageInfo: {
            startSize: 0,
            endSize: 0,
            total: 0,
            totalPages: 0,
        },
    });

    const setListRoute = (route) => {
        setRoutes({
            listRoute: route,
        });
    };

    const fetchData = useCallback(async (params) => {
        const result = await axios.post(routes.listRoute, {
            page: params.page + 1,
            query: params.search,
            per_page: initialParams.perPage,
            extra: initialParams?.extra,
        });

        setData({
            nodes: result.data.data,
            pageInfo: {
                startSize: result.data.meta.from,
                endSize: result.data.meta.to,
                total: result.data.meta.total,
                totalPages: Math.ceil(
                    result.data.meta.total / initialParams.perPage,
                ),
            },
        });
    }, []);

    const pagination = usePagination(
        data,
        {
            state: {
                page: initialParams.page,
            },
            onChange: (action, state) => {
                fetchData({
                    search: search,
                    page: state.page,
                });
            },
        },
        {
            isServer: true,
        },
    );

    useEffect(() => {
        fetchData({
            page: initialParams.page,
        });
    }, []);

    const timeout = useRef();

    const searchHandler = () => {
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            fetchData({
                search: search,
                page: initialParams.page,
            });
        }, 500);
    };

    const deleteHandler = async (url, data) => {
        router.delete(url, {
            preserveScroll: true,
            preserveState: false,
            only: ["errors"],
            data: data,
        });
    };

    useEffect(() => {
        Event.on(
            (name ? name + "." : "") + "reload",
            (data) => {
                fetchData({
                    search: search,
                    page: initialParams.page,
                });
            },
            this,
        );

        return () => Event.off((name ? name + "." : "") + "reload");
    }, []);

    return {
        data,
        search,
        setSearch,
        pagination,
        deleteHandler,
        searchHandler,
        setListRoute,
    };
};
