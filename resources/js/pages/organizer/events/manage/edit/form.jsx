import { Form as FormComponent, Input, Textarea } from "@/js/components/form";
import Calendar from "./calendar";
import { useCallback, memo } from "react";
import moment from "moment";
import { dateFormat } from "@/js/components/calendar";

export default memo(function Form({ form, handleDateChange, handleChange }) {
    return (
        <FormComponent className="text-sm">
            <div className="flex xs:flex-col  md:flex-row items-start justify-between w-full gap-x-10">
                <div className="w-full md:w-2/5">
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
                            onChange={(e) =>
                                handleChange("title", e.target.value)
                            }
                        />
                        {form.invalid("title") && (
                            <span className="text-danger text-xs">
                                {form.errors.title}
                            </span>
                        )}
                    </div>
                    <div className="block p-2">
                        <span className="font-medium text-gray-600">
                            Slug{" "}
                            <span className="text-xs">
                                (No space and special characters, except for
                                hypen.)
                            </span>
                        </span>
                        <Input
                            type="text"
                            name="slug"
                            value={form.data.slug}
                            maxLength="25"
                            className={`${
                                form.invalid("slug") ? "border-danger" : ""
                            } my-2`}
                            onChange={(e) =>
                                handleChange("slug", e.target.value)
                            }
                        />
                        {form.invalid("slug") && (
                            <span className="text-danger text-xs">
                                {form.errors.slug}
                            </span>
                        )}
                    </div>
                    <div className="block p-2">
                        <span className="font-medium text-gray-600">
                            Description
                        </span>
                        <Textarea
                            name="description"
                            maxLength="250"
                            className={`${
                                form.invalid("description")
                                    ? "border-danger"
                                    : ""
                            } my-2`}
                            value={form.data.description}
                            onChange={(e) =>
                                handleChange("description", e.target.value)
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
