import Layout from "./admin/backend";

export default function Index(props) {
    return (
        <>
            <Layout>{props.children}</Layout>
        </>
    );
}
