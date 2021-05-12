import { useEffect, useState } from "react";
import { NFT } from "../types";
import { API_URL } from "../utils/constants";

const useRelatedAssets = (nft: NFT): NFT[] => {
    const [related, setRelated] = useState<NFT[]>([]);
    useEffect(() => {
        const fetchRelated = async () => {
            if (nft?.artist?.id) {
                try {
                    const artistRes = await fetch(
                        `${API_URL}/artists/${nft?.artist?.id}`,
                    );
                    const artist = await artistRes.json();
                    setRelated(artist.tokens);
                } catch (err) {
                    console.log("Exception in fetchRelated", err);
                }
            }
        };
        fetchRelated();
    }, [nft?.artist]);

    return related;
};

export default useRelatedAssets;
