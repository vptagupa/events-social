import Load from "@/js/based/form/media/load";
import { currency } from "@/js/helpers";
import Event from "@/js/helpers/event";
import { router } from "@inertiajs/react";
import { useState, useEffect, memo, useCallback } from "react";

import Status from "./status";
import Processing from "./processing";
import Actions from "./actions";
import Info from "./info";
import Form from "./form";

export default memo(function Confirm({ value: _value }) {
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
            {!value.has_submitted && <Status value={value} />}
            <Processing
                show={
                    state.processing.cancelled ||
                    state.processing.rejected ||
                    state.processing.confirmed ||
                    state.processing.partial ||
                    state.processing.info
                }
            />
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
                    <Info value={value} meta={meta} />
                    <Form
                        state={state}
                        meta={meta}
                        setStateValue={setStateValue}
                    />
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
