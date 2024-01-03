import { Button } from "../buttons";
import PropTypes from "prop-types";
import {
    ArrowRightIcon,
    ArrowLeftIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";

const Component = ({ pagination, pageInfo }) => {
    return (
        <>
            {pageInfo && (
                <div className="flex space-x-1 justify-center">
                    <Button
                        className="bg-slate-400 text-white enabled:hover:bg-slate-500"
                        disabled={pagination.state.page === 0}
                        onClick={() => pagination.fns.onSetPage(0)}
                    >
                        <ChevronDoubleLeftIcon className="h-3" />
                    </Button>
                    <Button
                        className="bg-slate-400 text-white enabled:hover:bg-slate-500"
                        disabled={pagination.state.page === 0}
                        onClick={() =>
                            pagination.fns.onSetPage(pagination.state.page - 1)
                        }
                    >
                        <ArrowLeftIcon className="h-3" />
                    </Button>
                    <span>
                        {pageInfo.startSize}
                        {"-"}
                        {pageInfo.endSize}
                        {" of "}
                        {pageInfo.total}{" "}
                    </span>
                    <Button
                        className="bg-slate-400 text-white enabled:hover:bg-slate-500"
                        disabled={
                            pagination.state.page + 1 === pageInfo.totalPages ||
                            pageInfo.total === 0
                        }
                        onClick={() =>
                            pagination.fns.onSetPage(pagination.state.page + 1)
                        }
                    >
                        <ArrowRightIcon className="h-3" />
                    </Button>
                    <Button
                        className="bg-slate-400 text-white enabled:hover:bg-slate-500"
                        disabled={
                            pagination.state.page + 1 === pageInfo.totalPages ||
                            pageInfo.total === 0
                        }
                        onClick={() =>
                            pagination.fns.onSetPage(pageInfo.totalPages - 1)
                        }
                    >
                        <ChevronDoubleRightIcon className="h-3" />
                    </Button>
                </div>
            )}
        </>
    );
};

Component.propTypes = {
    pagination: PropTypes.object,
    pageInfo: PropTypes.exact({
        total: PropTypes.number,
        startSize: PropTypes.number,
        endSize: PropTypes.number,
        totalPages: PropTypes.number,
    }),
};

export default Component;
