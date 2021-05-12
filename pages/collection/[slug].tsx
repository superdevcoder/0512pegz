import { Collection, NFT } from "../../types";
import { API_URL } from "../../utils/constants";

import styles from "../../styles/collection.module.scss";
import Asset from "../../components/Asset";

const SingleCollectionPage: React.FC<{ collection: Collection }> = ({
    collection,
}) => {
    return (
        <main className={styles.collection}>
            <div className={styles.header}>
                <img src={collection.imageUrl} alt={collection.name} />
                <h1>{collection.name}</h1>
            </div>
            <div className={styles.assets}>
                <h3>Assets</h3>
                <div className={styles.assetsContainer}>
                    {collection.assets.map(
                        (asset: { token: NFT; id: number }) => {
                            return asset.token ? (
                                <Asset
                                    artist={asset.token?.artist?.name}
                                    reserve={asset.token.reserve}
                                    description={asset.token.description}
                                    imageUrl={asset.token.imageUrl}
                                    name={asset.token.name}
                                    slug={asset.token.slug}
                                    key={asset.id}
                                    soldFor={asset.token.soldFor}
                                    sold={asset.token.sold}
                                />
                            ) : null;
                        },
                    )}
                </div>
            </div>
        </main>
    );
};

export default SingleCollectionPage;

export async function getStaticPaths() {
    const tokenRes = await fetch(`${API_URL}/collections?_limit=-1`);
    const tokens = await tokenRes.json();

    return {
        paths: tokens.map((asset) => ({
            params: { slug: asset.slug },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const collectionRes = await fetch(
        `${API_URL}/collections?slug=${params.slug}`,
    );
    const collections = await collectionRes.json();
    const found = collections[0];

    return {
        props: {
            // We explicitly declare values because of serialization issues
            collection: {
                id: found.id,
                name: found.name,
                imageUrl: found.imageUrl,
                artist: found.artist,
                assets: found.assets,
                slug: found.slug,
            },
        },
    };
}
