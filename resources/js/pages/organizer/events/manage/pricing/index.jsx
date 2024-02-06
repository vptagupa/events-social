import Main from "../index";
import { PrimaryButton } from "@/js/components/buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect, useMemo, useCallback } from "react";

import { useControl } from "./control";
import Offers from "./components/offers";
import Price from "./components/price";
import Sidebar from "./sidebar";
import { router } from "@inertiajs/react";

import { Transition } from "@headlessui/react";

export default function Packages({ event, payment, errors }) {
    const control = useControl({
        ...event,
        price: event.price === null ? 0 : event.price,
    });
    const [processing, setProcessing] = useState(false);

    const save = useCallback(() => {
        if (processing) return;

        router.post(
            route("organizer.events.pricing.store", {
                event: event.id,
            }),
            {
                offers: control.data.offers,
                price: control.data.price,
            },
            {
                onBefore: () => setProcessing(true),
                onFinish: () => setProcessing(false),
            }
        );
    }, [event, control.data]);

    const Action = useMemo(
        () => () =>
            (
                <div className="flex gap-x-2 items-center">
                    <Transition
                        show={processing && Object.keys(errors).length <= 0}
                        className="text-xs"
                    >
                        Successfully save.
                    </Transition>
                    <div>
                        <PrimaryButton
                            processing={processing}
                            type="button"
                            className="flex items-center gap-x-1"
                            onClick={save}
                        >
                            <FontAwesomeIcon icon={faFloppyDisk} /> Save
                        </PrimaryButton>
                    </div>
                </div>
            ),
        [processing, errors, save]
    );

    useEffect(() => {
        const { price, offers } = event;

        control.setData({
            price: price === null ? 0 : price,
            offers,
        });
    }, [event]);

    return (
        <Main event={event} action={<Action />}>
            <div className="min-h-[30rem] flex md:flex-row flex-col gap-y-2 md:gap-x-2 p-2">
                {event.is_offer_package && (
                    <Offers event={event} control={control} errors={errors} />
                )}
                {!event.is_offer_package && (
                    <Price control={control} event={event} errors={errors} />
                )}
                <div className="w-full text-xs md:text-sm md:w-1/5 p-4 border border-slate-200 rounded-md bg-slate-200">
                    <Sidebar
                        event={event}
                        control={control}
                        payment={payment}
                    />
                </div>
            </div>
        </Main>
    );
}
