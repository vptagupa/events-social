import {
    Table,
    Tbody,
    Theader,
    TrH,
    Tr,
    Td,
    Th,
    Pagination,
    ThSelect,
    TdSelect,
} from "@/js/components/table";
import { Input, Checkbox } from "@/js/components/form";
import { SecondaryButton, PrimaryButton } from "@/js/components/buttons";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@table-library/react-table-library/theme";
import {
    useRowSelect,
    SelectTypes,
} from "@table-library/react-table-library/select";
import { Cell, HeaderCell } from "@table-library/react-table-library/table";
import Print from "../../actions/print";
import Download from "../../actions/download";
import PrintSelect from "../../actions/print-select";
import { useState } from "react";

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
    const [selected, setSelected] = useState([]);
    const theme = useTheme({
        Table: `
            --data-table-library_grid-template-columns: 26px repeat(3, minmax(0, 1fr)) 100px;
          `,
        Row: `
          &.row-select-selected {
            background-color: #e2e8f0;
          }
        `,
    });

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
        setSelected(state.ids);
    }

    return (
        <>
            <div className="md:absolute flex items-center justify-end mb-2 top-0 right-2">
                <PrintSelect event={event} value={selected} />
            </div>
            <div className="flex xs:max-md:flex-col xs:gap-y-2 md:gap-y-0 justify-end p-2">
                <div className="flex items-center">
                    <Input
                        type="text"
                        placeholder="Search by name, email, or code"
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
                select={select}
                className="rounded-2xl w-full !overflow-visible"
                theme={theme}
                layout={{ custom: true }}
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
                                <Th>Name</Th>
                                <Th>Code</Th>
                                <Th>Prints</Th>
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
                                        <Td>{item.name}</Td>
                                        <Td>{item?.workshop?.code ?? ""}</Td>
                                        <Td>{item.prints}</Td>
                                        <Td pinRight>
                                            <div className="flex items-center justify-end gap-x-2 p-1">
                                                <Print />
                                            </div>
                                        </Td>
                                    </Tr>
                                );
                            })}
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
