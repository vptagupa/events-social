export const stringLimit = (str, limit, extra) => {
    const ex = extra == undefined ? "..." : extra;

    if (str.length > limit) return str.substr(0, limit) + "" + ex;

    return str;
};

export const classNames = (custom, classNames) => {
    if (custom || classNames) {
        return (custom ?? "") + " " + (classNames ?? "");
    }

    return null;
};

export const toLocaleString = (date, options) => {
    return date.toLocaleString("en-US", options);
};

export const copy = (text, ref) => {
    if (window.isSecureContext && navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        ref.focus();
        ref.select();
        document.execCommand("copy");
    }
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

export const print = (ticket) => {
    return axios.post(`${import.meta.env.VITE_PRINTER_URL}/print`, {
        ticket,
    });
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
