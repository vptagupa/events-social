import PropTypes from "prop-types";
import { Button, PrimaryButton } from "@/js/components/buttons";

const Component = ({ closeForm, submit, form }) => {
    return (
        <>
            <div className="flex justify-end items-center">
                <div className="flex space-x-2 items-center">
                    <Button onClick={(e) => closeForm()}>Cancel</Button>
                    <PrimaryButton
                        onClick={(e) => submit()}
                        disabled={form.processing}
                        processing={form.processing}
                    >
                        Submit
                    </PrimaryButton>
                </div>
            </div>
        </>
    );
};

Component.propTypes = {
    closeForm: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
};

export default Component;
