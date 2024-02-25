import Load from "@/js/based/form/media/load";
import { currency } from "@/js/helpers";
import Event from "@/js/helpers/event";
import { router } from "@inertiajs/react";
import { useState, useEffect, memo, useCallback } from "react";

import Status from "./status";
import Processing from "./processing";

import Drawer from "./drawer";

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
        setState((state) => ({
            ...state,
            [key]: value,
        }));
    };

    const setProcessing = (key, value) => {
        setState((state) => ({
            ...state,
            processing: {
                ...state.processing,
                [key]: value,
            },
        }));
    };

    const submit = (route, data, process) => {
        return new Promise((resolve, reject) => {
            router.patch(route, data, {
                onError: (errors) => {
                    setStateValue("errors", errors);
                    resolve(false);
                },
                onBefore: () => {
                    setProcessing(process, true);
                },
                onSuccess: async () => {
                    await getInfo();
                    setState(stateRaw);
                    Event.emit("payments.reload");
                    resolve(true);
                },
                onFinish: () => {
                    setProcessing(process, false);
                },
                preserveScroll: true,
                preserveState: true,
            });
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
        <div className="w-full relative flex items-center justify-center">
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
            <Drawer
                state={state}
                meta={meta}
                value={value}
                setStateValue={setStateValue}
                submit={submit}
            />

            <div className="w-full flex items-center justify-center">
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
    );
});
