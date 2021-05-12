import groupBy from "lodash.groupby";

import { useEffect, useState } from "react";
import { AssetFromAPI, NFT, NFTWithOpenSeaData, OrderFromAPI } from "../types";
import findMaxBid from "../utils/findMaxBid";

interface FormattedTokens {
    [address: string]: NFT[];
}

/**
 * From API response to an object keyed by toke address
 * @param tokens
 * @returns {FormattedTokens} FormattedTokens
 */
const formatTokens = (tokens: NFT[]): FormattedTokens => {
    return groupBy(tokens, (token) => token.address);
};

const tokensFromOpenSea = async (
    contract: string,
    tokens: NFT[],
): Promise<AssetFromAPI[]> => {
    let tokenIds = "";
    tokens.forEach((token) => {
        // Sometimes tokenId can be undefined
        if (token.tokenId) {
            tokenIds += `token_ids=${token.tokenId}&`;
        }
    });
    const contractQ = `asset_contract_address=${contract}`;
    const lastPart = "&order_direction=desc&offset=0&limit=50";
    const res = await fetch(
        `https://api.opensea.io/api/v1/assets?${tokenIds}${contractQ}${lastPart}`,
        {
            headers: {
                "X-API-KEY": process.env.NEXT_PUBLIC_OPENSEA_KEY,
            },
        },
    );
    const data = await res.json();
    return data.assets;
};

const useEnrichedAssetsData = (assets: NFT[]) => {
    const [updatedAssets, setUpdatedAssets] = useState<
        NFTWithOpenSeaData[] | null
    >(null);

    useEffect(() => {
        const fetchAsset = async () => {
            const allPossibilities = formatTokens(assets);
            console.log("allPossibilities", allPossibilities);
            const addresses = Object.keys(allPossibilities);
            console.log("addresses", addresses);
            try {
                let enrichedAssets = [] as AssetFromAPI[];

                await Promise.all(
                    addresses.map(async (tokenAddress) => {
                        const fromThisBatch = await tokensFromOpenSea(
                            tokenAddress,
                            allPossibilities[tokenAddress],
                        );
                        enrichedAssets = enrichedAssets.concat(fromThisBatch);
                    }),
                );

                console.log("enrichedAssets", enrichedAssets);

                const mergedAssets = assets.map((token) => {
                    // Find order // Find amx bid
                    try {
                        const assetData = enrichedAssets.find(
                            (asset) =>
                                token.address.toLowerCase() ===
                                    asset.asset_contract.address.toLowerCase() &&
                                token.tokenId === asset.token_id,
                        );

                        console.log("assetData", assetData);

                        const salesOrder = assetData?.sell_orders?.[0];
                        const currentBid = findMaxBid([assetData?.top_bid]);

                        return { ...token, salesOrder, currentBid };
                    } catch (err) {
                        console.log("Exception in mergin", err);
                        return {
                            ...token,
                            salesOrder: undefined,
                            currentBid: undefined,
                        };
                    }
                });

                setUpdatedAssets(mergedAssets);
            } catch (err) {
                console.log("Exception in fetch asset", err);
            }
        };
        fetchAsset();
    }, [assets]);

    return updatedAssets || (assets as NFTWithOpenSeaData[]);
};

export default useEnrichedAssetsData;
