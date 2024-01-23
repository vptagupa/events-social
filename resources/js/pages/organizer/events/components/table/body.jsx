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
import { SecondaryButton } from "@/js/components/buttons";
import PropTypes from "prop-types";
import Edit from "../../actions/edit";
import Delete from "../../actions/confirm.delete";
import Activate from "../../actions/activate";
import Manage from "../../actions/manage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserCircle,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Component = ({
    data,
    roles,
    searching,
    pagination,
    setSearch,
    handleSearch,
    handleDelete,
    ...props
}) => {
    return (
        <>
            <div className="flex justify-end space-x-2 p-2">
                <div className="flex items-center">
                    <Input
                        type="text"
                        placeholder="Search by title"
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
                                <Th>Organizer</Th>
                                <Th>Title</Th>
                                <Th>Description</Th>
                                <Th>Start At</Th>
                                <Th>End At</Th>
                                <Th>Offer Price</Th>
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
                                                    {item.organizer.name}
                                                </span>
                                            </div>
                                        </Td>
                                        <Td>{item.title}</Td>
                                        <Td>{item.description}</Td>
                                        <Td>{item.expected_start_at}</Td>
                                        <Td>{item.expected_end_at}</Td>
                                        <Td className="text-center">
                                            P10.00 - P100.00
                                        </Td>
                                        <Td>
                                            <div className="flex space-x-2 justify-end">
                                                <Activate
                                                    id={item.id}
                                                    active={item.active}
                                                />
                                                <Manage value={item} />
                                                <Edit value={item} />
                                                <Delete id={item.id} />
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
