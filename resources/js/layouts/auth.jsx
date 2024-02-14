import Layout from "./public";
import Logo from "@/assets/images/logo.png";

export default function Index(props) {
    return (
        <Layout>
            <div>{props.children}</div>
        </Layout>
    );
}
