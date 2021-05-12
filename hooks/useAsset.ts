import { useCallback, useEffect, useState } from "react";
import { AssetFromAPI } from "../types";

const useAsset = (address: string, tokenId: string) => {
    const [asset, setAsset] = useState<AssetFromAPI | null>(null);

    const fetchAsset = useCallback(async () => {
        try {
            const res = await fetch(
                `https://api.opensea.io/api/v1/asset/${address}/${tokenId}`,
                {
                    headers: {
                        "X-API-KEY": process.env.NEXT_PUBLIC_OPENSEA_KEY,
                    },
                },
            );
            const data = await res.json();
            setAsset(data);
        } catch (err) {
            console.log("Exception in fetch asset", err);
        }
    }, [address, tokenId]);

    useEffect(() => {
        fetchAsset();
    }, [fetchAsset]);

    return { asset, fetchAsset };
};

export default useAsset;
