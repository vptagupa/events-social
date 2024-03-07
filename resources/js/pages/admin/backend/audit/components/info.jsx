import { Modal, Title } from "@/js/components/modal";
import { XMarkIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Button } from "@/js/components/buttons";

export default function Component({ item }) {
    const [open, setOpen] = useState(false);
    const styleName = "py-4 pr-4 font-bold";
    const style = "py-4";
    const border = "border-b last:border-b-0";

    return (
        <>
            <InformationCircleIcon
                className="h-6 text-purple-500"
                onClick={(e) => setOpen(true)}
            />

            <Modal open={open} className="w-1/2 bg-white rounded-lg p-4">
                <div className="relative">
                    <div
                        className="absolute cursor-pointer -right-2 -top-2 p-2 rounded-full bg-rose-300 text-white hover:bg-rose-500 hover:text-white"
                        onClick={(e) => setOpen(false)}
                    >
                        <XMarkIcon className="h-4" title="Close" />
                    </div>
                </div>
                <Title className="text-xl font-bold">Info</Title>
                <div>
                    <table className="w-full">
                        <tbody>
                            <tr className={border}>
                                <td className={styleName}>User:</td>
                                <td className={style}>{item.user.name}</td>
                            </tr>
                            <tr className={border}>
                                <td className={styleName}>Date & Time:</td>
                                <td className={style}>{item.created_at}</td>
                            </tr>
                            <tr className={border}>
                                <td className={styleName}>Event:</td>
                                <td className={style}>{item.event}</td>
                            </tr>
                            <tr className={border}>
                                <td className={styleName}>Model:</td>
                                <td className={style}>{item.auditable_type}</td>
                            </tr>
                            <tr className={border}>
                                <td className={styleName}>Id:</td>
                                <td className={style}>{item.auditable_id}</td>
                            </tr>
                            <tr className={border}>
                                <td className={styleName}>Old Values:</td>
                                <td className={style}>
                                    <pre>{item.old_values}</pre>
                                </td>
                            </tr>
                            <tr className={border}>
                                <td className={styleName}>New Values:</td>
                                <td className={style}>
                                    <pre>{item.new_values}</pre>
                                </td>
                            </tr>
                            <tr className={border}>
                                <td className={styleName}>Url:</td>
                                <td className={style}>{item.url}</td>
                            </tr>
                            <tr className={border}>
                                <td className={styleName}>Ip Address:</td>
                                <td className={style}>{item.ip_address}</td>
                            </tr>
                            <tr className={border}>
                                <td className={styleName}>Browser:</td>
                                <td className={style}>{item.user_agent}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Modal>
        </>
    );
}
