import Head from "next/head";
import { API_URL } from "../utils/constants";
import Collections from "../components/Collections";
import { Collection } from "../types";

import styles from "../styles/Index.module.scss";

export const CollectionsHome: React.FC<{ collections: Collection[] }> = ({
    collections,
}) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Chainsaw NFT</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Collections collections={collections} />
        </div>
    );
};

export default CollectionsHome;

export async function getStaticProps() {
    const collectionRes = await fetch(`${API_URL}/collections`);
    const collections = await collectionRes.json();

    return {
        props: {
            collections,
        },
    };
}
