import { useState, useEffect } from "react";
import { useForm as hookForm } from "laravel-precognition-react-inertia";

export const useForm = ({ method, route, data }) => {
    const [routes, setRoute] = useState(route ?? "");
    const [open, setOpen] = useState(false);
    const [completed, setCompleted] = useState(false);
    const form = hookForm(method, route, data);
    const [formData, setFormData] = useState(form.data);

    const closeForm = () => {
        if (form.processing) return;

        setOpen(false);
        clearForm();
    };

    const clearForm = () => {
        form.clearErrors();
        form.reset();
    };

    useEffect(() => {
        setFormData(data);
    }, [form.data]);

    return {
        formData,
        open,
        setOpen,
        form,
        closeForm,
        completed,
        setCompleted,
        setRoute,
        clearForm,
    };
};
