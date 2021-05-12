import { useEffect, useState } from "react";
import useSWR from "swr";
import Asset from "../components/Asset";
import { useUser } from "../context/UserContext";
import styles from "../styles/landing.module.scss";
import { NFT } from "../types";
import { fetchUserCollection } from "../utils/collection";
import { API_URL } from "../utils/constants";

/**
 * Fetch all tokens and return them
 * Uses swr for awesomeness
 * @returns
 */
const useAllTokens = () => {
    const fetchTokens = async () => {
        const res = await fetch(`${API_URL}/tokens?_limit=-1`);
        const tokens = await res.json();
        return tokens;
    };

    const { data, error } = useSWR("/tokens", fetchTokens);

    return data;
};

const useMyTokensCollection = (tokens: NFT[], userAddress?: string) => {
    const [collection, setCollection] = useState<NFT[]>([]);

    useEffect(() => {
        const fetchCollection = async () => {
            if (userAddress) {
                const result = await fetchUserCollection(tokens, userAddress);
                setCollection(result);
            }
        };
        fetchCollection();
    }, [tokens, userAddress]);

    return collection;
};

const MyCollectionPage: React.FC = () => {
    const user = useUser();
    const allTokens = useAllTokens();
    const myTokens = useMyTokensCollection(allTokens, user?.address);
    return (
        <div className={styles.container}>
            <h2>Your Collection</h2>
            {myTokens.map(
                ({
                    description,
                    imageUrl,
                    name,
                    slug,
                    reserve,
                    artist,
                    sold,
                    soldFor,
                }) => (
                    <Asset
                        key={name}
                        artist={artist?.name}
                        slug={slug}
                        description={description}
                        imageUrl={imageUrl}
                        name={name}
                        reserve={reserve}
                        sold={sold}
                        soldFor={soldFor}
                    />
                ),
            )}
            {myTokens.length === 0 && <h3>No tokens in your collection :(</h3>}
        </div>
    );
};

export default MyCollectionPage;
