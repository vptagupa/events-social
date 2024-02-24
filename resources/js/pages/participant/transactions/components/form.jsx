import Load from "@/js/based/form/media/load";
import { dateDisplay, currency } from "@/js/helpers";
import { Input } from "@/js/components/form";
import { Check } from "@/js/based/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPesoSign, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { AlertDanger } from "@/js/components/alerts";
import Event from "@/js/helpers/event";
import Confirmed from "../actions/confirmed";
import More from "../actions/more";
import { router } from "@inertiajs/react";

import { useState, useEffect, memo, useCallback } from "react";
import { Transition } from "@headlessui/react";

export default memo(function Form({ value: _value }) {
    const stateRaw = {
        amount: "",
        remarks: _value?.remarks,
        errors: null,
        processing: {
            confirmed: false,
            rejected: false,
            cancelled: false,
            partial: false,
            info: false,
        },
    };
    const [value, setValue] = useState(_value);
    const [meta, setMeta] = useState(null);
    const [state, setState] = useState({ ...stateRaw });

    const setStateValue = (key, value) => {
        setState({
            ...state,
            [key]: value,
        });
    };

    const setProcessing = (key, value) => {
        setState({
            ...state,
            processing: {
                ...state.processing,
                [key]: value,
            },
        });
    };

    const submit = (route, data, process) => {
        router.patch(route, data, {
            onError: (errors) => setStateValue("errors", errors),
            onBefore: () => setProcessing(process, true),
            onSuccess: async () => {
                await getInfo();
                setState(stateRaw);
                Event.emit("payments.reload");
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    const getInfo = useCallback(async () => {
        setProcessing("info", true);
        try {
            const res = await axios.get(
                route("organizer.participants.payments.info", _value.id)
            );
            if (res?.data?.data) {
                setValue(res.data.data);
                setMeta(res.data?.meta);
            }
        } catch (error) {
        } finally {
            setTimeout(() => {
                setProcessing("info", false);
            }, 500);
        }
    }, [_value]);

    useEffect(() => {
        if (_value) {
            getInfo();
        }
    }, [_value]);

    return (
        <div className="relative flex items-center justify-center">
            {!value.has_submitted && (
                <div
                    className={`w-full h-full bg-slate-600/50 absolute flex items-center justify-center z-50`}
                >
                    <span
                        className={`transform -rotate-45 uppercase text-7xl font-bold pt-4 pb-7 px-7 ${value.status_classes} rounded-xl`}
                    >
                        {value.status}
                        <p className="!text-sm text-end">{value.remarks}</p>
                    </span>
                </div>
            )}
            <Transition
                show={state.processing.info}
                className={`w-full h-full bg-slate-400 absolute flex items-center justify-center z-50`}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="w-full h-full animate-pulse bg-slate-600"></div>
            </Transition>
            <Transition
                show={
                    state.processing.cancelled ||
                    state.processing.rejected ||
                    state.processing.confirmed ||
                    state.processing.partial
                }
                className={`w-full h-full bg-slate-200/50 absolute flex items-center justify-center z-50`}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="w-full h-full flex items-center justify-center animate-pulse bg-slate-400">
                    <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin text-5xl"
                    />
                </div>
            </Transition>

            <div>
                <div className="h-8 flex items-center justify-center mx-3 my-2">
                    <div className="w-2/3 text-start flex items-center justify-between">
                        <div className="w-full text-lg">
                            {value.workshop.participant.name}
                        </div>
                    </div>
                    <Actions state={state} value={value} submit={submit} />
                </div>
                <div className="border-0 border-slate-300 rounded-md xs:max-sm:flex-col flex items-center justify-between gap-x-10">
                    <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-lg p-3">
                        <div className="w-full relative flex items-center justify-between border-b-0 border-slate-300">
                            <div className="w-full">
                                Date: {dateDisplay(value.created_at)}
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-between border-b-0 border-slate-300">
                            <div className="w-full">
                                Ref #: {value.reference}
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-between border-b-0 border-slate-300">
                            <div className="w-full">
                                Total Due:{" "}
                                {currency(
                                    parseFloat(value?.workshop?.amount ?? 0)
                                )}
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-between border-b-0 border-slate-300">
                            <div className="w-full">
                                Total Paid:{" "}
                                {currency(parseFloat(meta?.paid ?? 0))}
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-between border-b-0 border-slate-300">
                            <div className="w-full">
                                Balance:{" "}
                                {currency(parseFloat(meta?.balance ?? 0))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 text-slate-700 bg-slate-200 flex-col items-center justify-start p-2 gap-y-2 border-t border-b border-l border-slate-200 rounded-tl-xl rounded-bl-xl">
                        <div className="w-full flex items-center justify-center gap-x-2">
                            <span>
                                <FontAwesomeIcon
                                    icon={faPesoSign}
                                    className="text-6xl "
                                />
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
                                    value={state.amount}
                                    onChange={(e) =>
                                        setState({
                                            ...state,
                                            amount: e.target.value,
                                        })
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
                                    value={state.remarks}
                                    maxLength="150"
                                    onChange={(e) =>
                                        setState({
                                            ...state,
                                            remarks: e.target.value,
                                        })
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
                                            e.target.checked
                                                ? meta?.balance ?? ""
                                                : ""
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3 flex items-center justify-center bg-slate-900">
                    <Load
                        file={{
                            ...value.file,
                            title: value.workshop.participant.name,
                            content: currency(
                                parseFloat(value?.workshop?.amount ?? 0)
                            ),
                        }}
                    />
                </div>
            </div>
        </div>
    );
});

const Actions = ({ state, value, submit }) => (
    <div className="w-1/3 flex items-center justify-end gap-x-2">
        <Confirmed
            className={`${
                state.processing.confirmed
                    ? "animate-pulse !text-green-800 !scale-150"
                    : ""
            }`}
            value={value}
            onClick={(e) =>
                submit(
                    route(
                        "organizer.participants.payments.confirmed",
                        value.id
                    ),
                    {
                        amount: state.amount,
                        remarks: state.remarks,
                    },
                    "confirmed"
                )
            }
        />
        <More
            cancelled={(e) =>
                submit(
                    route(
                        "organizer.participants.payments.cancelled",
                        value.id
                    ),
                    {
                        remarks: state.remarks,
                    },
                    "cancelled"
                )
            }
            rejected={(e) =>
                submit(
                    route("organizer.participants.payments.rejected", value.id),
                    {
                        remarks: state.remarks,
                    },
                    "rejected"
                )
            }
            partial={(e) =>
                submit(
                    route("organizer.participants.payments.partial", value.id),
                    {
                        remarks: state.remarks,
                        amount: state.amount,
                    },
                    "partial"
                )
            }
        />
    </div>
);
