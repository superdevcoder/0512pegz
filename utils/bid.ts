import { OpenSeaPort } from "opensea-js";
import { WyvernSchemaName } from "opensea-js/lib/types";
/**
 * Given a seaport (with signer), place a bid on the given asset for the given startAmount
 * @param seaport
 * @param tokenAddress
 * @param tokenId
 * @param schemaName
 * @param accountAddress
 * @param startAmount
 */
export const bid = async (
    seaport: OpenSeaPort,
    tokenAddress: string,
    tokenId: string,
    schemaName: string,
    accountAddress: string,
    startAmount: number,
) => {
    return seaport.createBuyOrder({
        asset: {
            tokenId,
            tokenAddress,
            schemaName:
                schemaName === "ERC1155"
                    ? WyvernSchemaName.ERC1155
                    : WyvernSchemaName.ERC721, // WyvernSchemaName. If omitted, defaults to 'ERC721'. Other options include 'ERC20' and 'ERC1155'
        },
        quantity: 1,
        accountAddress,
        // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
        startAmount,
    });
};
