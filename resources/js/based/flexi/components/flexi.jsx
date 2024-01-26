import { uid } from "uid";
import { useState } from "react";
import { data as Data } from "./constants";

const findIndex = (data, value, key) =>
    data.findIndex((a) => a[key] == value[key]);

export const useFlexi = () => {
    const [data, set] = useState(Data);

    const addComponent = (flex, column, component) => {
        set(
            data.map((f) => {
                if (f.step === flex.step) {
                    f.columns = f.columns.map((c) => {
                        if (c.column == column.column) {
                            c.components = c.components.concat(component);
                        }
                        return c;
                    });
                }

                return f;
            })
        );
    };

    const componentRemove = (flex, column, component) => {
        set(
            data.map((f) => {
                if (f.step === flex.step) {
                    f.columns = f.columns.map((c) => {
                        if (c.column == column.column) {
                            c.components = c.components.filter(
                                (a) => a.id != component.id
                            );
                        }
                        return c;
                    });
                }

                return f;
            })
        );
    };

    const componentChange = (flex, column, component, value) => {
        set(
            data.map((f) => {
                if (f.step === flex.step) {
                    f.columns = f.columns.map((c) => {
                        if (c.column == column.column) {
                            const index = c.components.findIndex(
                                (a) => a.id == component.id
                            );
                            if (index !== -1) {
                                c.components[index].value = value;
                            }
                        }
                        return c;
                    });
                }

                return f;
            })
        );
    };

    const componentSelectChange = (
        flex,
        column,
        component,
        option,
        name,
        value
    ) => {
        console.log(value);
        set(
            data.map((f) => {
                if (f.step === flex.step) {
                    f.columns = f.columns.map((c) => {
                        if (c.column == column.column) {
                            c.components = c.components.map((a) => {
                                if (a.id == component.id) {
                                    const index = findIndex(
                                        a.config.options,
                                        option,
                                        "id"
                                    );
                                    if (index !== -1) {
                                        a.config.options[index][name] = value;
                                    }
                                }
                                return a;
                            });
                        }
                        return c;
                    });
                }

                return f;
            })
        );
    };

    const componentSelectRemove = (flex, column, component, option) => {
        set(
            data.map((f) => {
                if (f.step === flex.step) {
                    f.columns = f.columns.map((c) => {
                        if (c.column == column.column) {
                            c.components = c.components.map((a) => {
                                if (a.id == component.id) {
                                    a.config.options = a.config.options.filter(
                                        (o) => o.id != option.id
                                    );
                                }
                                return a;
                            });
                        }
                        return c;
                    });
                }

                return f;
            })
        );
    };

    const componentSelectAdd = (flex, column, component, value, text) => {
        set(
            data.map((f) => {
                if (f.step === flex.step) {
                    f.columns = f.columns.map((c) => {
                        if (c.column == column.column) {
                            c.components = c.components.map((a) => {
                                if (a.id == component.id) {
                                    a.config.options = a.config.options.concat({
                                        id: uid(),
                                        value,
                                        text,
                                    });
                                }
                                return a;
                            });
                        }
                        return c;
                    });
                }

                return f;
            })
        );
    };

    const changeConfig = (flex, column, component, name, value) => {
        console.log([flex, column, component, name, value]);
        set(
            data.map((f) => {
                if (f.step === flex.step) {
                    f.columns = f.columns.map((c) => {
                        if (c.column == column.column) {
                            c.components = c.components.map((a) => {
                                if (a.id == component.id) {
                                    a.config[name] = value;
                                }
                                return a;
                            });
                        }
                        return c;
                    });
                }

                return f;
            })
        );
    };

    const configActive = (flex, column, component) => {
        set(
            data.map((f) => {
                if (f.step === flex.step) {
                    f.columns = f.columns.map((c) => {
                        if (c.column == column.column) {
                            c.components = c.components.map((a) => {
                                if (a.id == component.id) {
                                    a.config.active = !a.config.active;
                                }
                                return a;
                            });
                        }
                        return c;
                    });
                }

                return f;
            })
        );
    };

    return {
        data,
        addComponent,
        componentRemove,
        componentChange,
        componentSelectChange,
        componentSelectRemove,
        componentSelectAdd,
        changeConfig,
        configActive,
    };
};
