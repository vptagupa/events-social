import axios from "axios";
import { useState, useCallback, useEffect, useRef } from "react";
import { usePagination } from "@table-library/react-table-library/pagination";
import Event from "./event";

export const useTable = ({ initialParams, listRoute: _listRoute, name }) => {
    const [routes, setRoutes] = useState({
        listRoute: _listRoute,
    });
    const [search, setSearch] = useState(initialParams.search);
    const [searching, setSearching] = useState(false);
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
                    result.data.meta.total / initialParams.perPage
                ),
            },
        });
        setSearching(false);
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
        }
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
            setSearching(true);
            fetchData({
                search: search,
                page: initialParams.page,
            });
        }, 500);
    };

    const reload = () => {
        fetchData({
            search: search,
            page: initialParams.page,
        });
    };

    useEffect(() => {
        Event.on(
            (name ? name + "." : "") + "reload",
            (data) => {
                reload();
            },
            this
        );

        return () => Event.off((name ? name + "." : "") + "reload");
    }, []);

    return {
        data,
        search,
        searching,
        pagination,
        setSearch,
        searchHandler,
        setListRoute,
        reload,
    };
};
