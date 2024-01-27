import Drop from "./drop";
import Move from "../actions/move";
import ConfigAction from "../actions/config";
import Remove from "../actions/remove";
import Config from "./config";
import Text from "./form/text";
import Select from "./form/select";
import Textarea from "./form/textarea";

export default function Component({
    flex,
    grid,
    column,
    component,
    move,
    add,
    change,
    remove,
    selectChange,
    selectAdd,
    selectRemove,
    changeConfig,
    configActive,
}) {
    return (
        <Drop
            onDrop={(e) => {
                var data;
                if ((data = e.dataTransfer.getData("data"))) {
                    add(flex, grid, column, JSON.parse(data));
                } else if ((data = e.dataTransfer.getData("move"))) {
                    data = JSON.parse(data);
                    move(data.flex, data.grid, data.column, data.component, {
                        flex,
                        grid,
                        column,
                        component,
                    });
                }
            }}
        >
            <div className="flex component">
                <div className="grow">
                    {["text", "notes"].includes(component.type) && (
                        <Text
                            value={component.config.defaultValue}
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
                        <Select values={component.config.options} />
                    )}
                    {component.type == "textarea" && <Textarea />}
                </div>
                <div className="w-20 flex items-center justify-center ml-2 p-1 border-l border-solid border-slate-300">
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
                            configActive(flex, grid, column, component)
                        }
                    />
                    <Remove
                        click={(e) => remove(flex, grid, column, component)}
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
                        selectRemove={(option) =>
                            selectRemove(flex, grid, column, component, option)
                        }
                    />
                </div>
            )}
        </Drop>
    );
}
