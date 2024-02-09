import { Form, Input, Textarea } from "@/js/components/form";
import Calendar from "../../actions/date";
import { AlertSuccess } from "@/js/components/alerts";
import { Transition } from "@headlessui/react";
import { fullDateTimeString } from "@/js/helpers";
import moment from "moment";
import { dateFormat } from "@/js/components/calendar";
export default function Component({ form }) {
    return (
        <Form className="text-sm">
            <div>
                <Transition show={form.recentlySuccessful}>
                    <AlertSuccess>Successfully save event.</AlertSuccess>
                </Transition>
            </div>
            <div className="block p-2">
                <span className="font-medium text-gray-600">Title</span>
                <Input
                    type="text"
                    name="name"
                    value={form.data.title}
                    maxLength="125"
                    className={`${
                        form.invalid("title") ? "border-danger" : ""
                    } my-2`}
                    onChange={(e) => form.setData("title", e.target.value)}
                />
                {form.invalid("title") && (
                    <span className="text-danger text-xs">
                        {form.errors.title}
                    </span>
                )}
            </div>
            <div className="block p-2">
                <span className="font-medium text-gray-600">Description</span>
                <Textarea
                    name="description"
                    maxLength="250"
                    className={`${
                        form.invalid("description") ? "border-danger" : ""
                    } my-2`}
                    value={form.data.description}
                    onChange={(e) =>
                        form.setData("description", e.target.value)
                    }
                >
                    {form.data.description}
                </Textarea>
                {form.invalid("description") && (
                    <span className="text-danger text-xs">
                        {form.errors.description}
                    </span>
                )}
            </div>
            <div className="block p-2">
                <span className="font-medium text-gray-600">Place</span>
                <Input
                    type="text"
                    name="place"
                    value={form.data.place}
                    maxLength="125"
                    className={`${
                        form.invalid("place") ? "border-danger" : ""
                    } my-2`}
                    onChange={(e) => form.setData("place", e.target.value)}
                />
                {form.invalid("place") && (
                    <span className="text-danger text-xs">
                        {form.errors.place}
                    </span>
                )}
            </div>
            <div className="block p-2">
                <span className="font-medium text-gray-600">Address</span>
                <Textarea
                    name="address"
                    maxLength="250"
                    className={`${
                        form.invalid("address") ? "border-danger" : ""
                    } my-2`}
                    value={form.data.address}
                    onChange={(e) => form.setData("address", e.target.value)}
                >
                    {form.data.address}
                </Textarea>
                {form.invalid("address") && (
                    <span className="text-danger text-xs">
                        {form.errors.address}
                    </span>
                )}
            </div>
            <div className="block p-2">
                <span className="font-medium text-gray-600">Map Address</span>
                <Input
                    type="text"
                    name="map"
                    value={form.data.map}
                    maxLength="125"
                    className={`${
                        form.invalid("map") ? "border-danger" : ""
                    } my-2`}
                    onChange={(e) => form.setData("map", e.target.value)}
                />
                {form.invalid("map") && (
                    <span className="text-danger text-xs">
                        {form.errors.map}
                    </span>
                )}
            </div>
            <div className="p-2">
                <div className="flex justify-between ">
                    <span className="font-medium text-gray-600">
                        Start DateTime
                    </span>
                    <Calendar
                        onChange={(date) => {
                            form.setData(
                                "start_at",
                                date instanceof moment
                                    ? date.format(dateFormat)
                                    : fullDateTimeString(date)
                            );
                        }}
                        value={form.data.start_at}
                    />
                </div>
                {form.invalid("start_at") && (
                    <span className="block text-danger text-xs text-end">
                        {form.errors.start_at}
                    </span>
                )}
            </div>
            <div className="p-2">
                <div className="flex justify-between ">
                    <span className="font-medium text-gray-600">
                        End DateTime
                    </span>
                    <Calendar
                        onChange={(date) => {
                            form.setData(
                                "end_at",
                                date instanceof moment
                                    ? date.format(dateFormat)
                                    : fullDateTimeString(date)
                            );
                        }}
                        value={form.data.end_at}
                    />
                </div>

                {form.invalid("end_at") && (
                    <span className="block text-danger text-xs text-end">
                        {form.errors.end_at}
                    </span>
                )}
            </div>
        </Form>
    );
}
