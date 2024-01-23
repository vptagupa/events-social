import Text from "./components/form/text";
import Select from "./components/form/select";
import Drop from "./components/drop";
import Move from "./components/actions/move";
import ConfigAction from "./components/actions/config";
import Remove from "./components/actions/remove";
import Config from "./components/config";

import { uid } from "uid";
import { useState } from "react";

const config = {
    active: false,
};

const lists = [
    {
        title: "Text",
        type: "text",
        value: "",
        config,
    },
    {
        title: "Select",
        type: "select",
        config,
    },
];

export default function Flexi() {
    const [components, setComponents] = useState([]);

    const handleDragContents = (e, data) => {
        e.dataTransfer.setData("data", data);
    };

    const handleRemove = (component) => {
        setComponents(components.filter((c) => c.id != component.id));
    };

    const handleChange = (component, value) => {
        setComponents(
            components.map((row) => {
                if (row.id == component.id) {
                    row.value = value;
                }

                return row;
            })
        );
    };

    const handleSelectChange = (component, option, name, value) => {
        setComponents(
            components.map((row) => {
                if (row.id == component.id) {
                    row.config.options = row.config.options.map((opt) => {
                        if (opt.id == option.id) {
                            opt[name] = value;
                        }
                        return opt;
                    });
                }

                return row;
            })
        );
    };

    const handleSelectRemove = (component, option) => {
        setComponents(
            components.map((row) => {
                if (row.id == component.id) {
                    row.config.options = row.config.options.filter(
                        (opt) => opt.id != option.id
                    );
                }

                return row;
            })
        );
    };

    const handleSelectAdd = (component, value, text) => {
        setComponents(
            components.map((row) => {
                if (row.id == component.id) {
                    row.config.options = (row.config?.options ?? []).concat({
                        id: uid(),
                        value,
                        text,
                    });
                }
                return row;
            })
        );
    };

    const handleChangeConfig = (component, name, value) => {
        setComponents(
            components.map((row) => {
                if (row.id == component.id) {
                    row.config[name] = value;
                }

                return row;
            })
        );
    };

    const handleConfigActive = (component) => {
        setComponents(
            components.map((row) => {
                if (row.id == component.id) {
                    row.config.active = !row.config.active;
                }

                return row;
            })
        );
    };
    console.log(components);
    return (
        <div className="flex grow min-h-[30rem]">
            <div className="grow m-2 flex flex-col gap-y-2">
                {components.map((row, idx) => {
                    return (
                        <Drop
                            key={row.id}
                            id={row.id}
                            className="flex flex-col"
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.target.classList.remove("border-slate-300");
                                e.target.classList.remove("border-green-600");
                                e.target.classList.add("border-green-600");
                            }}
                            onDragLeave={(e) => {
                                e.preventDefault();
                                e.target.classList.add("border-slate-300");
                                e.target.classList.remove("border-green-600");
                            }}
                            onDrop={(e) => {
                                e.preventDefault();
                                setComponents(
                                    components.concat(
                                        JSON.parse(
                                            e.dataTransfer.getData("data")
                                        )
                                    )
                                );
                            }}
                        >
                            <div className="flex">
                                <div className="grow">
                                    {row.type == "text" && (
                                        <Text
                                            value={row.value}
                                            onChange={(e) =>
                                                handleChange(
                                                    row,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    )}
                                    {row.type == "select" && <Select />}
                                </div>
                                <div className="w-20 flex items-center justify-center ml-2 p-1 border-l border-solid border-slate-300">
                                    <Move />
                                    <ConfigAction
                                        active={row.config.active}
                                        click={(e) => handleConfigActive(row)}
                                    />
                                    <Remove click={(e) => handleRemove(row)} />
                                </div>
                            </div>
                            {row.config.active && (
                                <div className="flex justify-center m-10">
                                    <Config
                                        value={row}
                                        change={handleChangeConfig}
                                        selectChange={handleSelectChange}
                                        selectAdd={handleSelectAdd}
                                        selectRemove={handleSelectRemove}
                                    />
                                </div>
                            )}
                        </Drop>
                    );
                })}
                <Drop
                    className="text-center flex items-center justify-center"
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.target.classList.remove("border-slate-300");
                        e.target.classList.remove("border-green-600");
                        e.target.classList.add("border-green-600");
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault();
                        e.target.classList.add("border-slate-300");
                        e.target.classList.remove("border-green-600");
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        setComponents(
                            components.concat(
                                JSON.parse(e.dataTransfer.getData("data"))
                            )
                        );
                    }}
                >
                    Drop here
                </Drop>
            </div>
            <div className="w-60 flex flex-col gap-y-2 min-h-[10rem] box-border border-l border-slate-300 p-2">
                {lists.map((row, idx) => (
                    <div
                        key={idx}
                        className="p-2 border-2 border-dotted border-slate-400 rounded-md shadow-sm cursor-move"
                        draggable={true}
                        onDragStart={(e) =>
                            handleDragContents(
                                e,
                                JSON.stringify({
                                    ...row,
                                    id: uid(),
                                    config: {
                                        ...config,
                                    },
                                })
                            )
                        }
                    >
                        {row.title}
                    </div>
                ))}
            </div>
        </div>
    );
}
