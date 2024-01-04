import Base from "./base";

export default (props) => {
    return (
        <Base
            active="secondary"
            inActive="secondary bg-opacity-20"
            {...props}
        />
    );
};
