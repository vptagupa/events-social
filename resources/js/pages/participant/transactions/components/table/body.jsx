import {
    Table,
    Tbody,
    Theader,
    TrH,
    Tr,
    Td,
    Th,
    Pagination,
} from "@/js/components/table";

import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserCircle,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "@inertiajs/react";
import { dateDisplay, currency } from "@/js/helpers";
import Action from "../../actions/action";
import Filter from "../../actions/filter";

const Component = ({
    event,
    data,
    search,
    searching,
    pagination,
    setSearch,
    handleSearch,
    handleDelete,
    ...props
}) => {
    return (
        <>
            <div className="flex xs:max-sm:flex-col xs:gap-y-2 md:gap-y-0 justify-between p-2 gap-x-2">
                <Filter
                    searching={searching}
                    handleSearch={handleSearch}
                    setSearch={setSearch}
                    search={search}
                />
            </div>
            <Table
                data={data}
                pagination={pagination}
                className="rounded-2xl w-full !overflow-visible"
            >
                {(tableList) => (
                    <>
                        <Theader>
                            <TrH>
                                <Th>Participant</Th>
                                <Th>Event</Th>
                                <Th>Date</Th>
                                <Th>Ref #</Th>
                                <Th>Price</Th>
                                <Th>Paid Amount</Th>
                                <Th>Status</Th>
                            </TrH>
                        </Theader>
                        <Tbody>
                            {tableList.map((item) => {
                                return (
                                    <Tr key={item.id}>
                                        <Td>
                                            <div className="flex space-x-1 items-center font-bold">
                                                <FontAwesomeIcon
                                                    className="h-5 border border-solid border-slate-300 rounded-2xl primary"
                                                    icon={faUserCircle}
                                                />

                                                <Link
                                                    href={route(
                                                        "organizer.participant.index",
                                                        item.workshop.id
                                                    )}
                                                    className="underline decoration-purple-600 underline-offset-2"
                                                >
                                                    {
                                                        item.workshop
                                                            .participant.name
                                                    }
                                                </Link>
                                            </div>
                                        </Td>
                                        <Td>
                                            <Link
                                                href={route(
                                                    "organizer.events.participants.index",
                                                    item.workshop.event.id
                                                )}
                                                className="underline decoration-purple-600 underline-offset-2"
                                            >
                                                {item.workshop.event.title}
                                            </Link>
                                        </Td>
                                        <Td>{dateDisplay(item.created_at)}</Td>
                                        <Td>{item.reference}</Td>
                                        <Td className="text-end">
                                            {currency(
                                                parseFloat(item.expected_price)
                                            )}
                                        </Td>
                                        <Td className="text-end">
                                            {currency(
                                                parseFloat(
                                                    item.actual_paid_amount
                                                )
                                            )}
                                        </Td>
                                        <Td>
                                            <div className="flex space-x-2 justify-end z-20">
                                                <Action value={item} />
                                            </div>
                                        </Td>
                                    </Tr>
                                );
                            })}
                            {tableList.length <= 0 && (
                                <Tr>
                                    <Td colSpan="3" className="text-center">
                                        No records
                                    </Td>
                                    <Td>&nbsp;</Td>
                                    <Td>&nbsp;</Td>
                                    <Td>&nbsp;</Td>
                                    <Td>&nbsp;</Td>
                                    <Td>&nbsp;</Td>
                                    <Td>&nbsp;</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </>
                )}
            </Table>
            <div className="p-2 mt-5">
                <Pagination pageInfo={data.pageInfo} pagination={pagination} />
            </div>
        </>
    );
};

Component.propTypes = {
    data: PropTypes.exact({
        nodes: PropTypes.array,
        pageInfo: PropTypes.exact({
            startSize: PropTypes.number,
            endSize: PropTypes.number,
            total: PropTypes.number,
            totalPages: PropTypes.number,
        }),
    }),
    Pagination: PropTypes.object,
};

export default Component;
