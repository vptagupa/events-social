import { memo } from "react";
import { Input } from "@/js/components/form";
import { Check } from "@/js/based/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPesoSign } from "@fortawesome/free-solid-svg-icons";

export default memo(function Form({ state, meta, setStateValue }) {
    return (
        <div className="w-full text-slate-700 bg-slate-200 flex-col items-center justify-start p-2 gap-y-2 border-t border-b border-l border-slate-200 rounded-tl-xl rounded-bl-xl">
            <div className="w-full flex items-center justify-center gap-x-2">
                <span>
                    <FontAwesomeIcon icon={faPesoSign} className="text-6xl " />
                </span>
                <div className="flex flex-col items-center justify-start">
                    <Input
                        placeholder="0.00"
                        className={`!text-5xl placeholder:text-slate-300 !bg-transparent
                trasition-all ease-in-out rounded-none !ring-0 focus:!outline-none 
                  ${
                      state.errors?.amount
                          ? "border-b-2 border-b-pink-300"
                          : "border-b border-b-slate-300"
                  }`}
                        value={state?.amount ?? ""}
                        onChange={(e) =>
                            setStateValue("amount", e.target.value)
                        }
                    />
                    {state.errors?.amount && (
                        <span className="w-full text-xs text-danger">
                            {state.errors?.amount}
                        </span>
                    )}
                </div>
            </div>
            <div className="w-full flex items-end justify-center">
                <div className="w-2/3 flex flex-col items-center justify-start">
                    <Input
                        placeholder="Remarks"
                        className={`!text-sm placeholder:text-slate-300 !bg-transparent 
                    trasition-all ease-in-out rounded-none !ring-0 focus:!outline-none 
                    ${
                        state.errors?.remarks
                            ? "border-b-2 border-b-pink-300"
                            : "border-b border-b-slate-300"
                    }`}
                        value={state?.remarks ?? ""}
                        maxLength="150"
                        onChange={(e) =>
                            setStateValue("remarks", e.target.value)
                        }
                    />
                    {state.errors?.remarks && (
                        <span className="w-full text-xs text-danger">
                            {state.errors?.remarks}
                        </span>
                    )}
                </div>
                <div className="w-1/3">
                    <Check
                        title="Full Payment"
                        className="!w-4 !h-4"
                        onChange={(e) =>
                            setStateValue(
                                "amount",
                                e.target.checked ? meta?.balance ?? "" : ""
                            )
                        }
                    />
                </div>
            </div>
        </div>
    );
});
