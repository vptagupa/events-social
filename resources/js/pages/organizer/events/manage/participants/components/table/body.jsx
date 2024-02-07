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

import Invite from "../actions/invite";
import Edit from "../actions/edit";
import Upp from "../actions/upp";
import Delete from "../actions/delete";
import RegForm from "../actions/reg";

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
            <div className="flex xs:max-md:flex-col xs:gap-y-2 md:gap-y-0 justify-between p-2">
                <div>
                    <Invite event={event} />
                </div>
                <div className="flex items-center">
                    <Input
                        type="text"
                        placeholder="Search by name"
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
                className="rounded-2xl w-full"
            >
                {(tableList) => (
                    <>
                        <Theader>
                            <TrH>
                                <Th>Code</Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
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
                                            <div className="flex space-x-2 items-center font-bold">
                                                <FontAwesomeIcon
                                                    className="h-5 border border-solid border-slate-300 rounded-2xl primary"
                                                    icon={faUserCircle}
                                                />
                                                <span>
                                                    {item.workshops[0].code}
                                                </span>
                                            </div>
                                        </Td>
                                        <Td>{item.name}</Td>
                                        <Td>{item.email}</Td>
                                        <Td>{item.is_confirmed}</Td>
                                        <Td>{item.workshops.payment_status}</Td>

                                        <Td>
                                            <div className="flex space-x-2 justify-end">
                                                <RegForm value={item} />
                                                <Edit value={item} />
                                                <Upp value={item} />
                                                <Delete value={item} />
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