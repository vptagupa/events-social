import Layout from "./admin";

export default function Index(props) {
    return (
        <>
            <Layout>{props.children}</Layout>
        </>
    );
}
