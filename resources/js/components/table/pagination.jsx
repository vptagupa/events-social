import { Button } from "../buttons";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faArrowLeft,
    faAnglesRight,
    faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";

const Component = ({ pagination, pageInfo }) => {
    return (
        <>
            {pageInfo && (
                <div className="flex space-x-1 justify-center">
                    <Button
                        className="bg-slate-400 text-white enabled:hover:bg-slate-500 disabled:bg-slate-300"
                        disabled={pagination.state.page === 0}
                        onClick={() => pagination.fns.onSetPage(0)}
                    >
                        <FontAwesomeIcon icon={faAnglesLeft} className="h-3" />
                    </Button>
                    <Button
                        className="bg-slate-400 text-white enabled:hover:bg-slate-500 disabled:bg-slate-300"
                        disabled={pagination.state.page === 0}
                        onClick={() =>
                            pagination.fns.onSetPage(pagination.state.page - 1)
                        }
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="h-3" />
                    </Button>
                    <span>
                        {pageInfo.startSize}
                        {"-"}
                        {pageInfo.endSize}
                        {" of "}
                        {pageInfo.total}{" "}
                    </span>
                    <Button
                        className="bg-slate-400 text-white enabled:hover:bg-slate-500 disabled:bg-slate-300"
                        disabled={
                            pagination.state.page + 1 === pageInfo.totalPages ||
                            pageInfo.total === 0
                        }
                        onClick={() =>
                            pagination.fns.onSetPage(pagination.state.page + 1)
                        }
                    >
                        <FontAwesomeIcon icon={faArrowRight} className="h-3" />
                    </Button>
                    <Button
                        className="bg-slate-400 text-white enabled:hover:bg-slate-500 disabled:bg-slate-300"
                        disabled={
                            pagination.state.page + 1 === pageInfo.totalPages ||
                            pageInfo.total === 0
                        }
                        onClick={() =>
                            pagination.fns.onSetPage(pageInfo.totalPages - 1)
                        }
                    >
                        <FontAwesomeIcon icon={faAnglesRight} className="h-3" />
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
