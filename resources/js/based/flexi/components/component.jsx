import Drop from "./drop";
import Move from "../actions/move";
import ConfigAction from "../actions/config";
import Remove from "../actions/remove";
import Config from "./config";
import Text from "./form/text";
import Select from "./form/select";
import Textarea from "./form/textarea";
import File from "./form/file";
import Checkbox from "./form/checkbox";
import Radio from "./form/radio";
import Contract from "./form/contract";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowsUpDown,
    faCaretDown,
    faCaretUp,
    faEllipsisV,
    faUpDown,
} from "@fortawesome/free-solid-svg-icons";

export default function Component({
    flex,
    grid,
    column,
    component,
    move,
    add,
    change,
    remove,
    up,
    down,
    selectChange,
    selectAdd,
    selectRemove,
    changeConfig,
    configActive,
    changeProperty,
}) {
    return (
        <div className="flex items-center justify-center gap-x-2">
            <div className="w-3 flex flex-col items-center justify-center">
                <FontAwesomeIcon
                    icon={faCaretUp}
                    title="Move up"
                    className="h-4 cursor-pointer text-slate-400/60 group-hover:text-lg hover:text-slate-800"
                    onClick={(e) => up(flex, grid, column, component)}
                />
                <FontAwesomeIcon
                    icon={faCaretDown}
                    title="Move down"
                    className="h-4 cursor-pointer text-slate-400/60 group-hover:text-lg hover:text-slate-800"
                    onClick={(e) => down(flex, grid, column, component)}
                />
            </div>
            <Drop
                className={`${component.class}`}
                onDrop={(e) => {
                    var data;
                    if ((data = e.dataTransfer.getData("data"))) {
                        add(flex, grid, column, JSON.parse(data));
                    } else if ((data = e.dataTransfer.getData("move"))) {
                        move(
                            {
                                flex,
                                grid,
                                column,
                                component,
                            },
                            JSON.parse(data)
                        );
                    }
                }}
            >
                <div className="flex items-center justify-center gap-x-2 component">
                    <div
                        className={`grow transition-all ease-in-out delay-75 duration-150`}
                    >
                        {["input", "notes", "label", "heading"].includes(
                            component.type
                        ) && (
                            <Text
                                placeholder={component.config?.placeholder}
                                value={component.config?.defaultValue ?? ""}
                                onChange={(e) =>
                                    change(
                                        flex,
                                        grid,
                                        column,
                                        component,
                                        e.target.value
                                    )
                                }
                            />
                        )}
                        {component.type == "select" && (
                            <Select
                                placeholder={component.config?.placeholder}
                                values={component.config.options}
                                value={component.config?.defaultValue ?? ""}
                                onChange={(e) =>
                                    change(
                                        flex,
                                        grid,
                                        column,
                                        component,
                                        e.target.value
                                    )
                                }
                            />
                        )}
                        {component.type == "textarea" && (
                            <Textarea
                                placeholder={component.config?.placeholder}
                                onChange={(e) =>
                                    change(
                                        flex,
                                        grid,
                                        column,
                                        component,
                                        e.target.value
                                    )
                                }
                            />
                        )}
                        {component.type == "file" && (
                            <File
                                onChange={(e) =>
                                    change(
                                        flex,
                                        grid,
                                        column,
                                        component,
                                        e.target.value
                                    )
                                }
                            />
                        )}
                        {component.type == "radio" && (
                            <Radio
                                value={component.config?.defaultValue ?? ""}
                                checked={
                                    component.config?.defaultValue ?? false
                                }
                                title={
                                    component.config?.name ?? "Configure name"
                                }
                                onChange={(e) =>
                                    change(
                                        flex,
                                        grid,
                                        column,
                                        component,
                                        e.target.checked
                                    )
                                }
                            />
                        )}
                        {component.type == "checkbox" && (
                            <Checkbox
                                value={component.config?.defaultValue ?? ""}
                                checked={
                                    component.config?.defaultValue ?? false
                                }
                                title={
                                    component.config?.name ?? "Configure name"
                                }
                                onChange={(e) =>
                                    change(
                                        flex,
                                        grid,
                                        column,
                                        component,
                                        e.target.checked
                                    )
                                }
                            />
                        )}
                        {component.type == "contract" && (
                            <Contract
                                checked={component.config?.defaultValue ?? ""}
                                title={component.config?.name ?? ""}
                                onChange={(e) =>
                                    change(
                                        flex,
                                        grid,
                                        column,
                                        component,
                                        e.target.checked
                                    )
                                }
                            />
                        )}
                    </div>
                    <div
                        className={`relative ${
                            component.config?.active ? "w-24" : "w-2"
                        } group hover:w-24 flex gap-x-2 items-center justify-center p-1 border-0 border-solid border-slate-300`}
                    >
                        <div className="absolute flex gap-x-2 items-center justify-center -right-1">
                            <div
                                className={`group-hover:visible ${
                                    component.config.active
                                        ? "visible"
                                        : "invisible"
                                } trasition-all ease-in delay-75 duration-75 flex item-center justify-center`}
                            >
                                <Move
                                    draggable={true}
                                    onDragStart={(e) =>
                                        e.dataTransfer.setData(
                                            "move",
                                            JSON.stringify({
                                                flex,
                                                grid,
                                                column,
                                                component,
                                            })
                                        )
                                    }
                                />
                                <ConfigAction
                                    active={component.config.active}
                                    click={(e) =>
                                        configActive(
                                            flex,
                                            grid,
                                            column,
                                            component
                                        )
                                    }
                                />
                                <Remove
                                    click={(e) =>
                                        remove(flex, grid, column, component)
                                    }
                                    title={`Remove ${component.type}`}
                                />
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    icon={faEllipsisV}
                                    className="h-6 cursor-pointer text-slate-600/60 group-hover:text-lg group-hover:text-slate-800"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {component.config.active && (
                    <div className="flex justify-center">
                        <Config
                            value={component}
                            change={(name, value) =>
                                changeConfig(
                                    flex,
                                    grid,
                                    column,
                                    component,
                                    name,
                                    value
                                )
                            }
                            selectChange={(option, name, value) =>
                                selectChange(
                                    flex,
                                    grid,
                                    column,
                                    component,
                                    option,
                                    name,
                                    value
                                )
                            }
                            selectAdd={(value, text) =>
                                selectAdd(
                                    flex,
                                    grid,
                                    column,
                                    component,
                                    value,
                                    text
                                )
                            }
                            changeProperty={(type, value) =>
                                changeProperty(
                                    flex,
                                    grid,
                                    column,
                                    component,
                                    type,
                                    value
                                )
                            }
                            selectRemove={(option) =>
                                selectRemove(
                                    flex,
                                    grid,
                                    column,
                                    component,
                                    option
                                )
                            }
                        />
                    </div>
                )}
            </Drop>
        </div>
    );
}
