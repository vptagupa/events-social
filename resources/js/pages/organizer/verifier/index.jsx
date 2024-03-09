import Layout from "@/js/layouts/admin";
import { useState } from "react";
import Scanner from "./actions/scanner";
import Search from "./actions/search";
import Participant from "./components/participant";
import { Transition } from "@headlessui/react";

export default function Verifier({ event }) {
    const [state, setState] = useState({
        scanner: false,
        search: false,
    });
    const [workshop, setWorkshop] = useState(null);

    return (
        <>
            <Layout>
                <div className="xs:p-2 md:px-4">
                    <div className="font-bold text-lg">
                        {event.title} verifier
                    </div>

                    <div className="min-h-screen rounded-2xl shadow-sm bg-gradient-to-t from-purple-500 to-purple-600 text-slate-100 pt-2 pb-3 flex flex-col items-center justify-center gap-y-2">
                        {!workshop && (
                            <div className="w-full md:w-1/2 p-2 flex flex-col items-center justify-center gap-y-2">
                                <Scanner
                                    onChange={setWorkshop}
                                    value={workshop}
                                    event={event}
                                    isOpen={state.scanner}
                                    onChangeState={(open) =>
                                        setState({
                                            ...state,
                                            scanner: open,
                                            search: open ? false : state.search,
                                        })
                                    }
                                />
                                <Search
                                    onChange={setWorkshop}
                                    value={workshop}
                                    event={event}
                                    isOpen={state.search}
                                    onChangeState={(open) =>
                                        setState({
                                            ...state,
                                            search: open,
                                            scanner: open
                                                ? false
                                                : state.scanner,
                                        })
                                    }
                                />
                            </div>
                        )}

                        <Transition
                            show={workshop ? true : false}
                            className="w-full md:w-1/2 p-4"
                        >
                            <Participant
                                workshop={workshop}
                                onChange={setWorkshop}
                            />
                        </Transition>
                    </div>
                </div>
            </Layout>
        </>
    );
}
