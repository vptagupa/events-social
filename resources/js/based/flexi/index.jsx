import Flex from "./components/flex";
import Attributes from "./components/attributes";
import { useFlexi } from "./flexi";
import Drop from "./components/drop";

export default function Flexi() {
    const { data, ...flexia } = useFlexi();
    console.log(data);
    return (
        <div className="flex grow min-h-[30rem]">
            <div className="w-[80%] m-2 flex flex-col gap-y-2">
                {data.map((flex) => (
                    <div
                        key={flex.flex}
                        className="w-full flex flex-col gap-3 --flex"
                    >
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
                ))}
            </div>
            <div className="w-[20%] flex flex-col gap-y-2 min-h-[10rem] box-border border-l border-slate-300 p-2">
                <Attributes />
            </div>
        </div>
    );
}
