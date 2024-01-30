import Flex from "./components/flex";
import Caption from "./components/caption";
import Remove from "./actions/remove";
import Config from "./actions/config";
import ConfigComponent from "./components/config";
import Attributes from "./components/attributes";
import { useFlexi } from "./flexi";
import Drop from "./components/drop";

export default function Flexi() {
    const flexia = useFlexi();
    console.log(flexia.data.flexis);
    return (
        <div className="flex grow min-h-[30rem]">
            <div className="w-[80%] m-2 flex flex-col gap-y-2">
                <div className="flex items-center justify-center">
                    <ol>
                        {flexia.data.flexis.map((flex) => (
                            <li
                                key={flex.flex}
                                className={`float-left px-3 py-1 m-1 cursor-pointer last:border-r-0 border-r border-slate-200
                                hover:bg-slate-100/50
                                ${flex.active ? "bg-slate-100/50" : ""}`}
                                onClick={(e) => flexia.flexToggleShow(flex)}
                            >
                                {flex.config.name}
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="relative">
                    {flexia.data.flexis.map((flex, idx) => (
                        <div
                            key={flex.flex}
                            className={`w-full flex flex-col border-2 border-dotted border-slate-300 rounded-md gap-3 p-2 --flex
                            transition-all ease-in-out duration-150 ${
                                flex.active
                                    ? "opacity-100 visible relative"
                                    : "opacity-0 invisible absolute"
                            }`}
                        >
                            <div
                                className={`relative flex items-center justify-center w-full mt-2`}
                            >
                                <div className="flex items-center justify-center absolute">
                                    <Remove
                                        click={(e) =>
                                            flexia.componentRemove(
                                                flex,
                                                null,
                                                null,
                                                flex
                                            )
                                        }
                                        title="Remove Step"
                                    />
                                    <Config
                                        click={(e) =>
                                            flexia.configActive(
                                                flex,
                                                null,
                                                null,
                                                flex
                                            )
                                        }
                                        active={flex.config.active}
                                    />
                                </div>
                            </div>
                            {flex.config.active && (
                                <div className="flex justify-center m-10">
                                    <ConfigComponent
                                        value={flex}
                                        change={(name, value) =>
                                            flexia.changeConfig(
                                                flex,
                                                null,
                                                null,
                                                flex,
                                                name,
                                                value
                                            )
                                        }
                                    />
                                </div>
                            )}
                            <div
                                className={`p-4 flex flex-col gap-3 --flex ${flex.config.class}`}
                            >
                                <Flex flex={flex} flexia={flexia} />
                                <Drop
                                    className="text-center flex flex-col items-center justify-center"
                                    onDrop={(e) =>
                                        flexia.addComponent(
                                            flex,
                                            null,
                                            null,
                                            JSON.parse(
                                                e.dataTransfer.getData("data")
                                            )
                                        )
                                    }
                                >
                                    Drop here
                                    <Caption
                                        title={`Step ${idx + 1}`}
                                        className="text-center uppercase"
                                    />
                                </Drop>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-[20%] flex flex-col gap-y-2 min-h-[10rem] box-border border-l border-slate-300 p-2">
                <Attributes {...flexia} />
            </div>
        </div>
    );
}
