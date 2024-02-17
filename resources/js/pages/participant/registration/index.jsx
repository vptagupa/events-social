import Layout from "@/js/layouts/admin";
import Cards from "./components/cards";
import Statuses from "./components/statuses";
import ActionStatuses from "./components/statuses/actions";
import Infos from "./components/info";
import Payments from "./components/payments";
import Actions from "./actions";
import { useControl } from "./control";
import { ControlContext } from "./context";
import { useEffect } from "react";

export default function Registration({ workshop, errors }) {
    const control = useControl();
    useEffect(() => {
        const get = async () => {
            const res = await axios.post(
                route("organizer.participant.registrationForm", workshop.id)
            );
            control.setData(res.data);
            control.setOther({
                ...control.other,
                note: workshop.note,
            });
        };

        get();
    }, []);

    return (
        <>
            <Layout>
                <ControlContext.Provider value={{ control, errors }}>
                    <div className="xs:p-2 md:px-4">
                        <div className="font-bold text-lg mb-5 flex items-center gap-x-2">
                            <span className="ml-2">
                                {(
                                    workshop.participant.name ?? "Participant"
                                ).toUpperCase()}{" "}
                                Registration
                            </span>
                            <ActionStatuses workshop={workshop} />
                        </div>
                        <div className="flex xs:max-sm:flex-col items-start justify-start gap-x-4">
                            <div className="w-full md:w-[60%] xs:max-sm:mb-5">
                                <Cards workshop={workshop} />
                            </div>
                            <div className="w-full md:w-[20%] border border-slate-200 rounded-md bg-slate-200 p-3">
                                <div className="mb-2">
                                    <Infos workshop={workshop} />
                                </div>
                                <div className="mb-2">
                                    <Payments workshop={workshop} />
                                </div>
                            </div>
                            <div className="w-full md:w-[20%] border border-slate-200 rounded-md bg-slate-200 p-3">
                                <Actions workshop={workshop} />
                                <Statuses workshop={workshop} />
                            </div>
                        </div>
                    </div>
                </ControlContext.Provider>
            </Layout>
        </>
    );
}
