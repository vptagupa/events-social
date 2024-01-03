import Base from "./base";

export default (props) => {
    return (
        <>
            <Base
                colorActive="secondary"
                colorInActive="secondary bg-opacity-20"
                {...props}
            />
        </>
    );
};
