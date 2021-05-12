import { BigNumber, Contract } from "ethers";
import groupBy from "lodash.groupby";
import { NFT } from "../types";
import { getInfuraProvider } from "./infura";

const IERC1155_ABI = [
    "function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids) external view returns (uint256[] memory)",
];

interface Token {
    address: string;
    tokenId: string;
}

interface FormattedTokens {
    [address: string]: NFT[];
}

/**
 * From API response to an object keyed by toke address
 * @param tokens
 * @returns {FormattedTokens} FormattedTokens
 */
export const formatTokens = (tokens: Token[]): FormattedTokens => {
    return groupBy(tokens, (token) => token.address);
};

/**
 * Utility to get contract for a token
 * @param address
 */
const makeERC1155Contract = (address: string): Contract => {
    return new Contract(address, IERC1155_ABI, getInfuraProvider());
};

export const tokensOwnedFromBatch = async (
    userAddress: string,
    tokenAddress: string,
    tokens: NFT[],
): Promise<NFT[]> => {
    const madeUserAddressArray = Array(tokens.length).fill(userAddress); // An array with the userAddress ids.lenght times

    const contract = makeERC1155Contract(tokenAddress);

    const ids = tokens.map((token) => token.tokenId);
    const balances = await contract.balanceOfBatch(madeUserAddressArray, ids);

    // Given the balances, get the indexes so we can get the tokens
    const withBalance = [];
    balances.forEach((value: BigNumber, index: number) => {
        if (value.gt(0)) {
            withBalance.push(index);
        }
    });

    return tokens.filter((token, counter) => withBalance.includes(counter));
};

/**
 * @param formattedTokens
 * @param userAddress
 * @returns
 */
export const bulkCheckBalance = async (
    formattedTokens: FormattedTokens,
    userAddress: string,
): Promise<NFT[]> => {
    let owned = [];
    const addresses = Object.keys(formattedTokens);
    await Promise.all(
        addresses.map(async (tokenAddress) => {
            const fromThisBatch = await tokensOwnedFromBatch(
                userAddress,
                tokenAddress,
                formattedTokens[tokenAddress],
            );
            owned = owned.concat(fromThisBatch);
        }),
    );

    return owned;
};

/**
 * Given a list of tokens and a user address, returns the tokens this user owns
 * @param tokens
 * @param userAddress
 */
export const fetchUserCollection = async (
    tokens: NFT[],
    userAddress: string,
): Promise<NFT[]> => {
    const formatted = formatTokens(tokens);
    const tokensInCollection = await bulkCheckBalance(formatted, userAddress);
    return tokensInCollection;
};
