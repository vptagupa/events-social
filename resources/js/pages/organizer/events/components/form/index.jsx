import { Form } from "@/js/components/form";
import { Input, Textarea } from "@/js/based/form";
import Calendar from "../../actions/date";
import { AlertSuccess } from "@/js/components/alerts";
import { Transition } from "@headlessui/react";
import { fullDateTimeString } from "@/js/helpers";
import moment from "moment";
import { dateFormat } from "@/js/components/calendar";
export default function Component({ form, handleChange }) {
    return (
        <Form className="text-sm">
            <div>
                <Transition show={form.recentlySuccessful}>
                    <AlertSuccess>Successfully save event.</AlertSuccess>
                </Transition>
            </div>
            <div className="grid grid-cols-2 gap-x-2">
                <div>
                    <Input
                        title="Title"
                        name="name"
                        value={form.data.title}
                        maxLength="120"
                        info={`Length: ${form.data.title.length}`}
                        className={`${
                            form.invalid("title") ? "border-danger" : ""
                        } my-2`}
                        onChange={(e) => handleChange("title", e.target.value)}
                        error={form.invalid("title") ? form.errors.title : null}
                    />
                    <Input
                        title={
                            <>
                                Slug{" "}
                                <span className="text-xs">
                                    (No space and special characters, except for
                                    hypen.)
                                </span>
                            </>
                        }
                        name="slug"
                        value={form.data.slug ?? ""}
                        maxLength="150"
                        info={`Length: ${(form.data.slug ?? "").length}`}
                        className={`${
                            form.invalid("slug") ? "border-danger" : ""
                        } my-2`}
                        onChange={(e) => handleChange("slug", e.target.value)}
                        error={form.invalid("slug") ? form.errors.slug : null}
                    />

                    <Textarea
                        title="Description"
                        name="description"
                        maxLength="400"
                        className={`${
                            form.invalid("description") ? "border-danger" : ""
                        } my-2`}
                        info={`Length: ${form.data.description.length}`}
                        value={form.data.description}
                        rows="5"
                        onChange={(e) =>
                            handleChange("description", e.target.value)
                        }
                        error={
                            form.invalid("description")
                                ? form.errors.description
                                : null
                        }
                    >
                        {form.data.description}
                    </Textarea>
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
                </div>
                <div>
                    <Input
                        title="Place"
                        name="place"
                        value={form.data.place ?? ""}
                        maxLength="250"
                        info={`Length: ${(form.data.place ?? "").length}`}
                        className={`${
                            form.invalid("place") ? "border-danger" : ""
                        } my-2`}
                        onChange={(e) => form.setData("place", e.target.value)}
                        error={form.invalid("place") ? form.errors.place : null}
                    />
                    <Textarea
                        title="Address"
                        name="address"
                        maxLength="400"
                        className={`${
                            form.invalid("address") ? "border-danger" : ""
                        } my-2`}
                        value={form.data.address ?? ""}
                        info={`Length: ${(form.data.address ?? "").length}`}
                        onChange={(e) =>
                            form.setData("address", e.target.value)
                        }
                        error={
                            form.invalid("address") ? form.errors.address : null
                        }
                    >
                        {form.data.address}
                    </Textarea>
                    <Textarea
                        title="Map Address"
                        name="map"
                        value={form.data.map ?? ""}
                        maxLength="400"
                        className={`${
                            form.invalid("map") ? "border-danger" : ""
                        } my-2`}
                        info={`Length: ${(form.data.map ?? "").length}`}
                        onChange={(e) => form.setData("map", e.target.value)}
                        error={form.invalid("map") ? form.errors.map : null}
                    >
                        {" "}
                        {form.data.map}
                    </Textarea>
                </div>
            </div>
        </Form>
    );
}
