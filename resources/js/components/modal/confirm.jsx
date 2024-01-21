import Modal from "./default";
import Title from "./title";
import Description from "./description";
import { SuccessButton, Button } from "@/js/components/buttons";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Component = ({
    open,
    title,
    description,
    yes,
    no,
    processing = false,
}) => {
    console.log(processing);
    return (
        <>
            <Modal open={open}>
                {title && <Title>{title}</Title>}
                <div className="flex justify-between">
                    {description && <Description>{description}</Description>}
                    <div className="flex space-x-2">
                        <SuccessButton
                            className="focus:border-red-400"
                            onClick={(e) => yes()}
                        >
                            Yes
                            {processing && (
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className="h-4 absolute text-slate-600 animate-spin"
                                />
                            )}
                        </SuccessButton>
                        <Button onClick={(e) => no()}>No</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

Component.propTypes = {
    open: PropTypes.bool.isRequired,
    yes: PropTypes.func.isRequired,
    no: PropTypes.func.isRequired,
};

export default Component;
