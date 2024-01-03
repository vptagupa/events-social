import Modal from "./default";
import Title from "./title";
import Description from "./description";
import { SuccessButton, Button } from "@/js/components/buttons";
import PropTypes from "prop-types";

const Component = ({ open, title, description, yes, no }) => {
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
