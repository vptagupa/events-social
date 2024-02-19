import { Modal, Title, Footer } from "@/js/components/modal";
import { Input, Select } from "@/js/components/form";
import { Button, PrimaryButton } from "@/js/components/buttons";
import Close from "../close";
import { memo, useState, useEffect, Fragment, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import {
    faCaretDown,
    faCircleMinus,
    faMinus,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { uid } from "uid";
import { AlertDanger, AlertInfo } from "@/js/components/alerts";
import ExportView from "./export-view";

export default memo(function Export({ event, registrationStatus }) {
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState(null);
    const [view, setView] = useState(null);
    const [processing, setProcessing] = useState({
        pdf: false,
        csv: false,
    });
    const [lists, setLists] = useState([]);
    const [filters, setFilters] = useState([
        {
            id: uid(),
            fixed: true,
            name: "Status",
            value: "",
            render: memo(({ value, data }) => {
                return (
                    <Select
                        onChange={(e) => {
                            value.value = e.target.value;
                            setData([...data]);
                        }}
                    >
                        <option value="">SELECT</option>
                        {registrationStatus.map((status, idx) => (
                            <option key={idx} value={status.id}>
                                {status.name}
                            </option>
                        ))}
                    </Select>
                );
            }),
        },
    ]);
    const [data, setData] = useState(filters);
    const dataRaw = {
        name: "",
        value: "",
        render: memo(({ value, data }) => (
            <Input
                onChange={(e) => {
                    value.value = e.target.value;
                    setData([...data]);
                }}
            />
        )),
    };

    const Options = memo(({ value, data, filters }) => (
        <MenuOptions
            onChange={(option) => {
                value.name = option.name;
                value.render = option.render;

                setData([...data]);
            }}
            value={value}
            options={filters}
        />
    ));

    const submit = async (type) => {
        try {
            setProcessing({
                [type.toLowerCase()]: true,
            });
            const res = await axios.post(
                route("organizer.events.export.create", event.id),
                {
                    type,
                    filter: data.map((d) => ({ name: d.name, value: d.value })),
                }
            );
            if (res?.data) {
                getList();
                setOpen(false);
                window.open(res.data, "_blank");
            }
        } catch (error) {
            if (error?.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setProcessing({
                pdf: false,
                csv: false,
            });
        }
    };

    const getList = async () => {
        const res = await axios.post(
            route("organizer.events.export.list", event.id)
        );
        if (res?.data) {
            setLists(res.data);
        }
    };

    const filteredOptions = filters.filter((f) =>
        f.name.toLowerCase() == "status"
            ? true
            : data.filter((d) => d.name == f.name).length <= 0
    );

    useEffect(() => {
        let data = [];

        const griddable = (grids) => {
            for (let grid of grids) {
                for (let column of grid.columns) {
                    for (let component of column.components) {
                        if (component.type == "grid") {
                            griddable(component.grids);
                        } else if (component.config?.is_searchable) {
                            data = data.concat({
                                name: component.config?.name ?? "",
                                value: "",
                                render: ({ value, data }) => (
                                    <Input
                                        onChange={(e) => {
                                            value.value = e.target.value;
                                            setData([...data]);
                                        }}
                                    />
                                ),
                            });
                        }
                    }
                }
            }
        };

        for (let flex of event.registration_form?.schema?.flexis ?? []) {
            griddable(flex.grids);
        }

        setFilters(filters.concat(...data));
    }, [event.registration_form]);

    useEffect(() => {
        if (errors) {
            setTimeout(() => {
                setErrors(null);
            }, 3000);
        }
    }, [errors]);

    useEffect(() => {
        getList();
    }, []);

    return (
        <>
            <div className="flex items-center gap-x-2">
                <span
                    className="cursor-pointer "
                    onClick={(e) => setOpen(true)}
                >
                    Export
                </span>{" "}
                <ExportList lists={lists} setView={setView} />
            </div>

            <ExportView value={view} setView={setView} />

            <Modal open={open}>
                <Close click={(e) => setOpen(false)} />
                <Title>Export Filter</Title>

                <Transition show={errors ? true : false}>
                    <AlertDanger>
                        {errors?.filter ? errors.filter : "Failed to export."}
                    </AlertDanger>
                </Transition>
                <Transition show={processing.pdf || processing.csv}>
                    <AlertInfo>
                        Your export is currently being processed. You may close
                        this form and access the export list to download your
                        file.
                    </AlertInfo>
                </Transition>

                <div className="flex flex-col justify-center gap-y-4 max-h-[400px] overflow-y-auto p-2">
                    {data.map((row, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-x-3 w-full"
                        >
                            <div className="w-[30%] flex items-center justify-start">
                                <div className="w-[15%]">
                                    <FontAwesomeIcon
                                        title="Remove"
                                        icon={faCircleMinus}
                                        className="text-red-300 text-sm cursor-pointer"
                                        onClick={(e) =>
                                            setData(
                                                data.filter(
                                                    (d) => d.id != row.id
                                                )
                                            )
                                        }
                                    />
                                </div>
                                <div className="grow">
                                    {" "}
                                    {!row?.fixed ? (
                                        <Options
                                            value={row}
                                            data={data}
                                            filters={filteredOptions}
                                        />
                                    ) : (
                                        row.name
                                    )}
                                </div>
                            </div>
                            <div className="w-[70%]">
                                <row.render value={row} data={data} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-10">
                    <div
                        className="w-full text-center border border-slate-300 rounded-md p-2 cursor-pointer hover:bg-slate-200"
                        onClick={(e) =>
                            setData(data.concat({ ...dataRaw, id: uid() }))
                        }
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="text-3xl text-slate-400"
                        />
                    </div>
                </div>
                <Footer>
                    <div className="flex justify-end items-center">
                        <div className="flex space-x-2 items-center">
                            <PrimaryButton
                                type="button"
                                onClick={(e) => {
                                    submit("PDF");
                                }}
                                processing={processing.pdf}
                            >
                                PDF
                            </PrimaryButton>
                            <Button
                                type="button"
                                className="bg-green-600/80 text-white"
                                onClick={(e) => {
                                    submit("CSV");
                                }}
                                processing={processing.csv}
                            >
                                CSV
                            </Button>
                        </div>
                    </div>
                </Footer>
            </Modal>
        </>
    );
});

const ExportList = memo(({ lists, setView }) => (
    <Menu as="div" className="inline-block text-left z-50">
        <div>
            <Menu.Button className="flex w-full items-center justify-center focus:outline-none ">
                <FontAwesomeIcon
                    icon={faCaretDown}
                    className="text-xl text-slate-400 hover:text-slate-600"
                />
            </Menu.Button>
        </div>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            className="absolute"
        >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-slate-200 shadow-lg ring-1 ring-black/5 focus:outline-none">
                <Menu.Item className="px-1 py-1 ">
                    {({ close }) => (
                        <ol>
                            {(lists?.data ?? []).map((file, idx) => (
                                <li
                                    key={idx}
                                    className="p-2 hover:bg-primary cursor-pointer group hover:text-slate-200 rounded-md duration-all ease-in-out delay-100 duration-150 "
                                    onClick={(e) => setView(file)}
                                >
                                    {file.filename.split(".")[0]}
                                </li>
                            ))}
                        </ol>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Transition>
    </Menu>
));

const MenuOptions = memo(({ options, onChange, value }) => (
    <Menu as="div" className="inline-block text-left z-50 w-full">
        <div>
            <Menu.Button className="inline-flex w-full items-center justify-between focus:outline-none hover:text-slate-600">
                <span>{value?.name != "" ? value.name : "Select"}</span>
                <FontAwesomeIcon
                    icon={faCaretDown}
                    className="text-xl text-slate-400"
                />
            </Menu.Button>
        </div>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            className="absolute"
        >
            <Menu.Items className="absolute max-h-[200px] overflow-y-auto left-2 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-slate-200 shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1 ">
                    <ol>
                        {options.map((option, idx) => (
                            <li
                                key={idx}
                                className="p-2 hover:bg-primary group hover:text-slate-200 rounded-md duration-all ease-in-out delay-100 duration-150 "
                                onClick={(e) => onChange(option)}
                            >
                                {option.name}
                            </li>
                        ))}
                    </ol>
                </div>
            </Menu.Items>
        </Transition>
    </Menu>
));
