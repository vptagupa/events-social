import Load from "@/js/based/form/media/load";
import { currency } from "@/js/helpers";
import Event from "@/js/helpers/event";
import { router } from "@inertiajs/react";
import { useState, useEffect, memo, useCallback } from "react";

import Status from "./status";
import Processing from "./processing";

import Drawer from "./drawer";

import { useForm } from "@/js/helpers/form";

export default memo(function Confirm({ value: _value }) {
    const [processing, setProcessing] = useState(false);
    const { form } = useForm({
        method: "post",
        route: "",
        data: {
            amount: "",
            remarks: _value?.remarks ?? "",
            file: "",
        },
    });

    const [value, setValue] = useState(_value);
    const [meta, setMeta] = useState(null);

    const setStateValue = (key, value) => {
        form.setData({
            ...form.data,
            [key]: value,
        });
    };

    const submit = (route) => {
        if (form.processing) return;

        return new Promise((resolve, reject) => {
            form.submit("post", route, {
                onError: (errors) => {
                    resolve(false);
                },
                onSuccess: async () => {
                    await getInfo();
                    form.reset();
                    Event.emit("payments.reload");
                    resolve(true);
                },
                preserveScroll: true,
                preserveState: true,
            });
        });
    };

    const getInfo = useCallback(async () => {
        setProcessing(true);
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
                setProcessing(false);
            }, 500);
        }
    }, [_value]);

    useEffect(() => {
        if (_value) {
            getInfo();
        }
    }, [_value]);

    return (
        <div className="w-full min-h-[500px] relative flex items-center justify-center">
            {!value.has_submitted && <Status value={value} />}
            <Processing show={form.processing || processing ? true : false} />
            <Drawer
                form={form}
                meta={meta}
                value={value}
                setStateValue={setStateValue}
                submit={submit}
            />

            <div className="w-full flex items-center justify-center !text-black">
                <Load
                    file={{
                        ...value.file,
                        title: value.workshop.participant.name,
                        content: currency(
                            parseFloat(value?.workshop?.amount ?? 0)
                        ),
                    }}
                    pdf={{ modal: false }}
                />
            </div>
        </div>
    );
});
