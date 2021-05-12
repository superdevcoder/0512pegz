import { Collection as CollectionInterface } from "../../types";
import Collection from "../Collection";
import styles from "./Collections.module.scss";

const Auctions: React.FC<{ collections: CollectionInterface[] }> = ({
    collections,
}) => {
    return (
        <main className={styles.collections}>
            <h1 className={styles.title}>Collections</h1>
            <div className={styles.collectionsContainer}>
                {collections.map(
                    ({ artist, assets, imageUrl, name, slug, id }) => (
                        <Collection
                            key={name}
                            slug={slug}
                            imageUrl={imageUrl}
                            name={name}
                            assets={assets}
                            artist={artist}
                            id={id}
                        />
                    ),
                )}
            </div>
        </main>
    );
};

export default Auctions;
