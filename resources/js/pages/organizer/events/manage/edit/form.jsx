import { Form as FormComponent } from "@/js/components/form";
import { Input, Textarea } from "@/js/based/form";
import Calendar from "./calendar";
import { useCallback, memo } from "react";
import moment from "moment";
import { dateFormat } from "@/js/components/calendar";

export default memo(function Form({ form, handleDateChange, handleChange }) {
    return (
        <FormComponent className="text-sm">
            <div className="flex xs:flex-col  md:flex-row items-start justify-between w-full gap-x-10">
                <div className="w-full md:w-2/5">
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
                    <Input
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
                    />
                </div>
                <div className="w-full md:w-3/5 flex xs:flex-col md:flex-row items-start justify-center gap-x-2">
                    <div className="xs:w-full md:w-1/2 p-2 flex flex-col">
                        <div className="flex flex-col">
                            <div className="flex justify-between mb-5">
                                <span className="font-medium text-gray-600">
                                    Start Date Time
                                </span>
                                <span className="flex items-center gap-x-1">
                                    <span className="underline">
                                        {moment(
                                            form.data.start_at,
                                            dateFormat
                                        ).format(dateFormat)}
                                    </span>
                                </span>
                            </div>
                            <Calendar
                                onChange={useCallback(
                                    (date) =>
                                        handleDateChange("start_at", date),
                                    []
                                )}
                                value={form.data.start_at}
                            />
                        </div>
                        {form.invalid("start_at") && (
                            <span className="block text-danger text-xs text-end">
                                {form.errors.start_at}
                            </span>
                        )}
                    </div>
                    <div className="xs:w-full md:w-1/2 p-2">
                        <div className="flex flex-col">
                            <div className="flex justify-between mb-5">
                                <span className="font-medium text-gray-600">
                                    End Date Time
                                </span>
                                <span className="flex items-center gap-x-1">
                                    <span className="underline">
                                        {moment(
                                            form.data.end_at,
                                            dateFormat
                                        ).format(dateFormat)}
                                    </span>
                                </span>
                            </div>
                            <Calendar
                                onChange={useCallback(
                                    (date) => handleDateChange("end_at", date),
                                    []
                                )}
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
            </div>
        </FormComponent>
    );
});
