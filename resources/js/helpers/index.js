import moment from "moment";

export const stringLimit = (str, limit, extra) => {
    const ex = extra == undefined ? "..." : extra;

    if (str.length > limit) return str.substr(0, limit) + "" + ex;

    return str;
};

export const toLocaleString = (date, options) => {
    return date.toLocaleString("en-US", options);
};

export const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

export const createObjectUrl = (file) => {
    if (file instanceof File) {
        return URL.createObjectURL(file);
    }

    return file;
};

export const fullDateTimeString = (date) => {
    const twoDigit = (v) =>
        v > 9 ? v : v.toString().length <= 1 ? "0" + v : v;

    return (
        twoDigit(date.getMonth() + 1) +
        "/" +
        twoDigit(date.getDate()) +
        "/" +
        date.getFullYear() +
        " " +
        twoDigit(
            date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
        ) +
        ":" +
        twoDigit(date.getMinutes()) +
        " " +
        (date.getHours() > 12 ? "PM" : "AM")
    );
};

export const currency = (amount) => {
    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "PHP",
    });
};

export const dateDisplay = (date) => {
    return date ? moment(date).format("MMMM Do YYYY, h:mm a") : "";
};
