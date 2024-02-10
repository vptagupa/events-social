import Caption from "./caption";
import Remove from "../actions/remove";
import Config from "../actions/config";
import ConfigComponent from "./config";
import Elipses from "../actions/elipses";

import Drop from "./drop";
import Grids from "./grids";

export default function Flex({ flexia, flex }) {
    return (
        <div
            className={`w-full flex flex-col border-2 border-dotted border-slate-300 rounded-md gap-3 p-2 --flex
            transition-all ease-in-out duration-150`}
        >
            <div
                className={`relative flex items-center justify-center w-full mt-2`}
            >
                <div className="flex items-center justify-center absolute">
                    <Elipses active={flex.config.active}>
                        <Remove
                            click={(e) => flexia.remove(flex, null, null, flex)}
                            title="Remove Step"
                        />
                        <Config
                            click={(e) =>
                                flexia.configActive(flex, null, null, flex)
                            }
                            active={flex.config.active}
                        />
                    </Elipses>
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
            <div className={`p-4 flex flex-col gap-3 --flex ${flex.class}`}>
                <Grids flex={flex} grids={flex.grids} flexia={flexia} />
                <Drop
                    className="text-center flex flex-col items-center justify-center"
                    onDrop={(e) => {
                        var data;
                        if ((data = e.dataTransfer.getData("data"))) {
                            data = JSON.parse(data);
                            flexia.add(flex, null, null, data);
                        } else if ((data = e.dataTransfer.getData("move"))) {
                            data = JSON.parse(data);
                            flexia.move(
                                {
                                    flex,
                                    grid: null,
                                    column: null,
                                    component: null,
                                },
                                data
                            );
                        }
                    }}
                >
                    Drop here
                    <Caption title={`Step`} className="text-center uppercase" />
                </Drop>
            </div>
        </div>
    );
}
