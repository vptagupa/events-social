import Base from "./base";

const Component = ({ className = "", ...props }) => {
    return <Base {...props} className={`table ${className}`} />;
};

export default Component;
