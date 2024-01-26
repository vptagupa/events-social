import Text from "./components/form/text";
import Select from "./components/form/select";
import Textarea from "./components/form/textarea";
import Drop from "./components/drop";
import Move from "./components/actions/move";
import ConfigAction from "./components/actions/config";
import Remove from "./components/actions/remove";
import Config from "./components/config";
import { Input as FormInput } from "@/js/components/form";

import { uid } from "uid";
import { config, attributes } from "./components/constants";
import { useFlexi } from "./components/flexi";

export default function Flexi() {
    const {
        data,
        addComponent,
        componentRemove,
        componentChange,
        componentSelectChange,
        componentSelectRemove,
        componentSelectAdd,
        changeConfig,
        configActive,
    } = useFlexi();

    const handleDragContents = (e, data) => {
        e.dataTransfer.setData("data", data);
    };
    console.log(data);
    return (
        <div className="flex grow min-h-[30rem]">
            <div className="w-[80%] m-2 flex flex-col gap-y-2">
                {data.map((flex) => (
                    <div key={flex.step} className="flex flex-col gap-3">
                        {flex.columns.map((column) => (
                            <div key={column.column}>
                                {column.components.map((component) => (
                                    <Drop
                                        key={component.id}
                                        id={component.id}
                                        className="flex flex-col"
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            e.target.classList.remove(
                                                "border-slate-300"
                                            );
                                            e.target.classList.remove(
                                                "border-green-600"
                                            );
                                            e.target.classList.add(
                                                "border-green-600"
                                            );
                                        }}
                                        onDragLeave={(e) => {
                                            e.preventDefault();
                                            e.target.classList.add(
                                                "border-slate-300"
                                            );
                                            e.target.classList.remove(
                                                "border-green-600"
                                            );
                                        }}
                                        onDrop={(e) =>
                                            addComponent(
                                                flex,
                                                column,
                                                JSON.parse(
                                                    e.dataTransfer.getData(
                                                        "data"
                                                    )
                                                )
                                            )
                                        }
                                    >
                                        <div className="flex">
                                            <div className="grow">
                                                {component.type == "text" && (
                                                    <Text
                                                        value={component.value}
                                                        onChange={(e) =>
                                                            componentChange(
                                                                flex,
                                                                column,
                                                                component,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                )}
                                                {component.type == "select" && (
                                                    <Select
                                                        values={
                                                            component.config
                                                                .options
                                                        }
                                                    />
                                                )}
                                                {component.type ==
                                                    "textarea" && <Textarea />}
                                            </div>
                                            <div className="w-20 flex items-center justify-center ml-2 p-1 border-l border-solid border-slate-300">
                                                <Move />
                                                <ConfigAction
                                                    active={
                                                        component.config.active
                                                    }
                                                    click={(e) =>
                                                        configActive(
                                                            flex,
                                                            column,
                                                            component
                                                        )
                                                    }
                                                />
                                                <Remove
                                                    click={(e) =>
                                                        componentRemove(
                                                            flex,
                                                            column,
                                                            component
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        {component.config.active && (
                                            <div className="flex justify-center m-10">
                                                <Config
                                                    value={component}
                                                    change={(name, value) =>
                                                        changeConfig(
                                                            flex,
                                                            column,
                                                            component,
                                                            name,
                                                            value
                                                        )
                                                    }
                                                    selectChange={(
                                                        option,
                                                        name,
                                                        value
                                                    ) =>
                                                        componentSelectChange(
                                                            flex,
                                                            column,
                                                            component,
                                                            option,
                                                            name,
                                                            value
                                                        )
                                                    }
                                                    selectAdd={(value, text) =>
                                                        componentSelectAdd(
                                                            flex,
                                                            column,
                                                            component,
                                                            value,
                                                            text
                                                        )
                                                    }
                                                    selectRemove={(option) =>
                                                        componentSelectRemove(
                                                            flex,
                                                            column,
                                                            component,
                                                            option
                                                        )
                                                    }
                                                />
                                            </div>
                                        )}
                                    </Drop>
                                ))}
                            </div>
                        ))}
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
                            onDrop={(e) =>
                                addComponent(
                                    { step: 1 },
                                    { column: 1 },
                                    JSON.parse(e.dataTransfer.getData("data"))
                                )
                            }
                        >
                            Drop here
                        </Drop>
                    </div>
                ))}
            </div>
            <div className="w-[20%] flex flex-col gap-y-2 min-h-[10rem] box-border border-l border-slate-300 p-2">
                {attributes.map((attribute, idx) => (
                    <div
                        key={idx}
                        className="p-2 border-2 border-dotted border-slate-400 rounded-md shadow-sm cursor-move"
                        draggable={attribute.type != "value" ? true : false}
                        onDragStart={(e) =>
                            handleDragContents(
                                e,
                                JSON.stringify({
                                    ...attribute,
                                    id: uid(),
                                    config: {
                                        ...config,
                                    },
                                })
                            )
                        }
                    >
                        {attribute.type == "value" && (
                            <div className="block p-1">
                                <label>{attribute.title}</label>
                                <FormInput
                                    type="text"
                                    className="my-2"
                                    {...attribute.attr}
                                />
                            </div>
                        )}
                        {attribute.type != "value" && attribute.title}
                    </div>
                ))}
            </div>
        </div>
    );
}
