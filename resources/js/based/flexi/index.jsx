import Flex from "./components/flex";
import Caption from "./components/caption";
import Remove from "./actions/remove";
import Attributes from "./components/attributes";
import { useFlexi } from "./flexi";
import Drop from "./components/drop";

export default function Flexi() {
    const flexia = useFlexi();

    return (
        <div className="flex grow min-h-[30rem]">
            <div className="w-[80%] m-2 flex flex-col gap-y-2">
                {flexia.data.flexis.map((flex) => (
                    <div
                        key={flex.flex}
                        className="w-full flex flex-col border-2 border-dotted border-slate-300 rounded-md gap-3 p-2 --flex"
                    >
                        <div className="relative">
                            <div className="absolute -bottom-4 right-0">
                                <Remove
                                    click={(e) => flexia.componentRemove(flex)}
                                />
                            </div>
                        </div>
                        <div className="p-2 --flex">
                            <Flex flex={flex} flexia={flexia} />
                            {flex.grids.length <= 0 && (
                                <Drop
                                    className="text-center flex items-center justify-center"
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
                                </Drop>
                            )}
                        </div>

                        <Caption
                            title={`Step ${flex.flex}`}
                            className="text-center"
                        />
                    </div>
                ))}
            </div>
            <div className="w-[20%] flex flex-col gap-y-2 min-h-[10rem] box-border border-l border-slate-300 p-2">
                <Attributes {...flexia} />
            </div>
        </div>
    );
}
