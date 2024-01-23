import { Input } from "@/js/components/form";
import { PrimaryButton } from "@/js/components/buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Select({ title, change, add, remove, options = [] }) {
    const [value, setValue] = useState("");
    const [text, setText] = useState("");
    return (
        <div>
            <div className="block p-1 border-b border-slate-300 mb-2">
                <label>{title}</label>
                <div className="mt-2">
                    <div className="grid grid-cols-3 gap-x-2">
                        <div>
                            <label>Value</label>
                            <Input
                                type="text"
                                className="my-2"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Text</label>
                            <Input
                                type="text"
                                className="my-2"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <PrimaryButton
                                type="button"
                                onClick={(e) => {
                                    if (value && text) {
                                        add(value, text);
                                        setValue("");
                                        setText("");
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block max-h-[15rem] p-2 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-300 scrollbar-track-gray-200">
                <p>Added Options</p>
                {options.map((option, idx) => (
                    <div key={idx} className="flex gap-x-2">
                        <div className="block">
                            <Input
                                type="text"
                                className="my-2"
                                placeholder="Value"
                                value={option.value}
                                onChange={(e) =>
                                    change(option, "value", e.target.value)
                                }
                            />
                        </div>
                        <div className="block">
                            <Input
                                type="text"
                                className="my-2"
                                placeholder="Text"
                                value={option.text}
                                onChange={(e) =>
                                    change(option, "text", e.target.value)
                                }
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <FontAwesomeIcon
                                className="h-6 text-red-300 hover:text-red-500 cursor-pointer"
                                onClick={(e) => remove(option)}
                                icon={faMinusCircle}
                            />
                        </div>
                    </div>
                ))}
                {options.length <= 0 && <>No options.</>}
            </div>
        </div>
    );
}
