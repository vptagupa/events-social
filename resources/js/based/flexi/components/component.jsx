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
            id={component.id}
            className=""
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
                add(
                    flex,
                    grid,
                    column,
                    JSON.parse(e.dataTransfer.getData("data"))
                )
            }
        >
            <div className="flex">
                <div className="grow">
                    {component.type == "text" && (
                        <Text
                            value={component.config.defaultValue}
                            onChange={(e) =>
                                change(flex, column, component, e.target.value)
                            }
                        />
                    )}
                    {component.type == "select" && (
                        <Select values={component.config.options} />
                    )}
                    {component.type == "textarea" && <Textarea />}
                </div>
                <div className="w-20 flex items-center justify-center ml-2 p-1 border-l border-solid border-slate-300">
                    <Move />
                    <ConfigAction
                        active={component.config.active}
                        click={(e) => configActive(flex, column, component)}
                    />
                    <Remove click={(e) => remove(flex, column, component)} />
                </div>
            </div>
            {component.config.active && (
                <div className="flex justify-center m-10">
                    <Config
                        value={component}
                        change={(name, value) =>
                            changeConfig(flex, column, component, name, value)
                        }
                        selectChange={(option, name, value) =>
                            selectChange(
                                flex,
                                column,
                                component,
                                option,
                                name,
                                value
                            )
                        }
                        selectAdd={(value, text) =>
                            selectAdd(flex, column, component, value, text)
                        }
                        selectRemove={(option) =>
                            selectRemove(flex, column, component, option)
                        }
                    />
                </div>
            )}
        </Drop>
    );
}
