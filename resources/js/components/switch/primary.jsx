import Base from "./base";

export default (props) => {
    return (
        <>
            <Base
                colorActive="primary"
                colorInActive="primary bg-opacity-20"
                {...props}
            />
        </>
    );
};
