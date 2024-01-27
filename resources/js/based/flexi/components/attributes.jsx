import { config, attributes } from "../constants";
import Flex from "./form/flex";

export default function Attributes(props) {
    return attributes.map((attribute, idx) => (
        <div
            key={idx}
            className="p-2 border-2 border-dotted border-slate-400 rounded-md shadow-sm cursor-move"
            draggable={attribute.draggable}
            onDragStart={(e) =>
                e.dataTransfer.setData(
                    "data",
                    JSON.stringify({
                        ...attribute,
                        config: {
                            ...config,
                        },
                    })
                )
            }
        >
            {attribute.type == "flex" && (
                <Flex
                    value={props.data.flexis.length}
                    clickMinus={props.minusFlex}
                    clickPlus={props.plusFlex}
                />
            )}
            {attribute.type != "value" && attribute.title}
        </div>
    ));
}
