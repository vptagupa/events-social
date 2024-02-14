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
import { Input } from "@/js/components/form";
import { SecondaryButton, PrimaryButton } from "@/js/components/buttons";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserCircle,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import Participant from "../../actions/participant";
import Tracker from "../../actions/tracker";
import { Link } from "@inertiajs/react";

const Component = ({
    event,
    data,
    searching,
    pagination,
    setSearch,
    handleSearch,
    handleDelete,
    ...props
}) => {
    return (
        <>
            <div className="flex  xs:gap-y-2 md:gap-y-0 justify-end p-2">
                <div className="flex items-center">
                    <Input
                        type="text"
                        placeholder="Search by code, email and name"
                        className="border-r-0 rounded-r-none lg:w-96"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <SecondaryButton
                        onClick={(e) => handleSearch()}
                        className="shadow-none border border-slate-300 rounded-l-none"
                    >
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className={`h-5 ${
                                searching ? "animate-pulse text-amber-300" : ""
                            }`}
                        />
                    </SecondaryButton>
                </div>
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
                                <Th>Organizer</Th>
                                <Th>Event</Th>
                                <Th>Code</Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Accepted</Th>
                                <Th>Confirmed</Th>
                                <Th>Payment Status</Th>
                                <Th>Action</Th>
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
                                                        "organizer.events.index",
                                                        item.workshops[0].event
                                                            .organizer.id
                                                    )}
                                                    className="underline decoration-purple-600"
                                                >
                                                    {
                                                        item.workshops[0].event
                                                            .organizer.name
                                                    }
                                                </Link>
                                            </div>
                                        </Td>
                                        <Td>
                                            <Link
                                                href={route(
                                                    "organizer.events.participants.index",
                                                    item.workshops[0].event.id
                                                )}
                                                className="underline decoration-purple-600"
                                            >
                                                {item.workshops[0].event.title}
                                            </Link>
                                        </Td>
                                        <Td>{item.workshops[0].code}</Td>
                                        <Td>{item.name}</Td>
                                        <Td>{item.email}</Td>
                                        <Td>{item.workshops[0].accepted_at}</Td>
                                        <Td>
                                            {item.workshops[0].confirmed_at}
                                        </Td>
                                        <Td>
                                            {item.workshops[0].payment_status}
                                        </Td>

                                        <Td>
                                            <div className="flex space-x-2 justify-end">
                                                <Participant value={item} />
                                                <Tracker value={item} />
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
