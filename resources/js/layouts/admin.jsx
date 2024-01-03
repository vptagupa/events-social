import Layout from "./private";

export default function Index(props) {
    return (
        <>
            <Layout>{props.children}</Layout>
        </>
    );
}
