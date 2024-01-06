import Layout from "./dashboard";

export default function Index(props) {
    return (
        <>
            <Layout>{props.children}</Layout>
        </>
    );
}
