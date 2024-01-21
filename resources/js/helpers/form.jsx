import { useState } from "react";
import { useForm as hookForm } from "laravel-precognition-react-inertia";

export const useForm = ({ method, route, data }) => {
    const [open, setOpen] = useState(false);
    const form = hookForm(method, route, data);

    const closeForm = () => {
        if (form.processing) return;

        setOpen(false);
        clearForm();
    };

    const clearForm = () => {
        form.clearErrors();
        form.reset();
    };

    return {
        open,
        form,
        setOpen,
        closeForm,
        clearForm,
    };
};
