import { Input } from "@/js/components/form";
import { config, attributes } from "../constants";
import { uid } from "uid";

export default function Attributes() {
    return attributes.map((attribute, idx) => (
        <div
            key={idx}
            className="p-2 border-2 border-dotted border-slate-400 rounded-md shadow-sm cursor-move"
            draggable={attribute.type != "value" ? true : false}
            onDragStart={(e) =>
                e.dataTransfer.setData(
                    "data",
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
                    <Input type="text" className="my-2" {...attribute.attr} />
                </div>
            )}
            {attribute.type != "value" && attribute.title}
        </div>
    ));
}
