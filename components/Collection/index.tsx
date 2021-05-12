import Link from "next/link";
import React from "react";
import { Collection as CollectionInterface } from "../../types";

import styles from "./Collection.module.scss";

const Collection: React.FC<CollectionInterface> = ({
    slug,
    name,
    imageUrl,
}) => {
    return (
        <Link href={`/collection/${slug}`}>
            <a>
                <div key={slug} className={styles.collection}>
                    <div className={styles.imageContainer}>
                        <img src={imageUrl} alt={name} />
                    </div>
                    <div className={styles.info}>
                        <h3>{name}</h3>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default Collection;
