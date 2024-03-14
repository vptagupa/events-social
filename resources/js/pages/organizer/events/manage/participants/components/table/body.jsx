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
import { Input, Checkbox } from "@/js/components/form";
import { SecondaryButton, PrimaryButton } from "@/js/components/buttons";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserCircle,
    faMagnifyingGlass,
    faEdit,
    faReceipt,
} from "@fortawesome/free-solid-svg-icons";

import Invite from "../actions/invite";
import Edit from "../actions/edit";
import Upp from "../actions/upp";
import Participant from "../actions/participant";
import More from "../actions/more";

import { Cell, HeaderCell } from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import {
    useRowSelect,
    SelectTypes,
} from "@table-library/react-table-library/select";
import {
    useSort,
    HeaderCellSort,
} from "@table-library/react-table-library/sort";
import ContentEditable from "react-contenteditable";
import { useState } from "react";

import Statuses from "../statuses";
import OfficialReceipt from "../actions/or";

const Component = ({
    event,
    data,
    search,
    searching,
    pagination,
    setSearch,
    handleSearch,
    handleDelete,
    fetchData,
    ...props
}) => {
    const [selected, setSelected] = useState([]);
    const theme = useTheme({
        Table: `
            --data-table-library_grid-template-columns: 26px 100px 100px 200px 200px repeat(3, minmax(0, 1fr)) 150px;
          `,
        Row: `
          &.row-select-selected {
            background-color: #e2e8f0;
          }
        `,
    });

    function onSortChange(action, state) {
        fetchData({
            search: {
                ...search,
            },
            sort: [
                {
                    key: state.sortKey,
                    asc: state.reverse,
                },
            ],
        });
    }

    const sort = useSort(
        data,
        {
            onChange: onSortChange,
        },
        {
            isServer: true,
        }
    );

    const select = useRowSelect(
        data,
        {
            onChange: onSelectChange,
        },
        {
            rowSelect: SelectTypes.MultiSelect,
            buttonSelect: SelectTypes.MultiSelect,
        }
    );

    function onSelectChange(action, state) {
        setSelected(state?.ids ?? []);
    }

    return (
        <>
            <div className="w-full flex xs:max-md:flex-col xs:gap-y-2 md:gap-y-0 justify-between p-2">
                <div className="w-full md:w-2/5">
                    <Invite event={event} />
                </div>
                <div className="w-full md:w-3/5 xs:max-sm:flex-col flex items-center xs:gap-y-2 md:gap-y-0 gap-x-2 justify-end">
                    <div className="w-full md:w-52 z-20">
                        <Statuses setSearch={setSearch} />
                    </div>
                    <div className="grow flex items-center">
                        <Input
                            type="text"
                            placeholder="Search by name, email, or code"
                            className="border-r-0 rounded-r-none w-full"
                            onChange={(e) =>
                                setSearch((search) => ({
                                    ...search,
                                    query: e.target.value,
                                }))
                            }
                        />
                        <SecondaryButton
                            onClick={(e) => handleSearch()}
                            className="shadow-none border border-slate-300 rounded-l-none"
                        >
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className={`h-5 ${
                                    searching
                                        ? "animate-pulse text-amber-300"
                                        : ""
                                }`}
                            />
                        </SecondaryButton>
                    </div>
                </div>
            </div>
            <Table
                data={data}
                pagination={pagination}
                className="rounded-2xl w-full !overflow-visible"
                theme={theme}
                layout={{ custom: true }}
                sort={sort}
            >
                {(tableList) => (
                    <>
                        <Theader>
                            <TrH>
                                <HeaderCell>
                                    <div className="pl-2">
                                        <Checkbox
                                            className="!w-4 !h-4"
                                            checked={select.state.all}
                                            indeterminate={
                                                !select.state.all &&
                                                !select.state.none
                                                    ? "true"
                                                    : "false"
                                            }
                                            onChange={select.fns.onToggleAll}
                                        />
                                    </div>
                                </HeaderCell>
                                <Th>Code</Th>
                                <Th>O.R#</Th>
                                <HeaderCellSort sortKey="name">
                                    Name
                                </HeaderCellSort>
                                <Th>Email</Th>
                                <Th>Submitted</Th>
                                <Th>Confirmed</Th>
                                <Th>Payment Status</Th>
                                <Th>Action</Th>
                            </TrH>
                        </Theader>
                        <Tbody>
                            {tableList.map((item) => {
                                return (
                                    <Tr key={item.id} item={item}>
                                        <Cell>
                                            <div className="pl-2">
                                                <Checkbox
                                                    className="!w-4 !h-4"
                                                    checked={select.state.ids.includes(
                                                        item.id
                                                    )}
                                                    onChange={() =>
                                                        select.fns.onToggleById(
                                                            item.id
                                                        )
                                                    }
                                                />
                                            </div>
                                        </Cell>
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
                                        <Td>
                                            <OfficialReceipt value={item} />
                                        </Td>
                                        <Td>{item.name}</Td>
                                        <Td>{item.email}</Td>
                                        <Td>
                                            {item.workshops[0].submitted_at}
                                        </Td>
                                        <Td>
                                            {item.workshops[0].confirmed_at}
                                        </Td>
                                        <Td>
                                            {item.workshops[0].payment_status}
                                        </Td>

                                        <Td>
                                            <div className="flex space-x-2 justify-end">
                                                <Participant value={item} />
                                                <Edit value={item} />
                                                <Upp value={item} />
                                                <More value={item} />
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
