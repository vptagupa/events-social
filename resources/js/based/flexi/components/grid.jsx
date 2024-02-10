import Caption from "./caption";
import Remove from "../actions/remove";
import Elipses from "../actions/elipses";
import Drop from "./drop";
import Columns from "./columns";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

export default function Grid({ flex, grid, flexia }) {
    return (
        <div className="flex flex-col --grid">
            <div className="relative">
                <div className="absolute -bottom-2 left-0">
                    <Elipses>
                        <Remove
                            click={(e) => flexia.remove(flex, grid, null, grid)}
                            title="Remove Grid"
                        />
                    </Elipses>
                </div>
            </div>
            <div
                className={`flex flex-col items-center gap-3 p-4 ${grid.class} --grid`}
            >
                <div className="flex w-full gap-3">
                    <div className="w-3 flex flex-col items-center justify-center">
                        <FontAwesomeIcon
                            icon={faCaretUp}
                            title="Move up"
                            className="h-4 cursor-pointer text-slate-400/60 group-hover:text-lg hover:text-slate-800"
                            onClick={(e) => flexia.up(flex, grid, null, grid)}
                        />
                        <FontAwesomeIcon
                            icon={faCaretDown}
                            title="Move down"
                            className="h-4 cursor-pointer text-slate-400/60 group-hover:text-lg hover:text-slate-800"
                            onClick={(e) => flexia.down(flex, grid, null, grid)}
                        />
                    </div>
                    <Columns
                        columns={grid.columns}
                        flex={flex}
                        grid={grid}
                        flexia={flexia}
                    />
                </div>
                <Drop
                    className="text-center flex flex-col items-center justify-center"
                    onDrop={(e) => {
                        var data;
                        if ((data = e.dataTransfer.getData("data"))) {
                            data = JSON.parse(data);
                            flexia.add(flex, grid, null, data);
                        } else if ((data = e.dataTransfer.getData("move"))) {
                            data = JSON.parse(data);
                            flexia.move(
                                { flex, grid, column: null, component: null },
                                data
                            );
                        }
                    }}
                >
                    Drop here
                    <Caption title={`Grid`} className="text-center" />
                </Drop>
            </div>
        </div>
    );
}
