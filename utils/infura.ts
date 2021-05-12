import { providers } from "ethers";

/**
 * Create a new read only infura provider
 * NOTE: This will always be faster than using the magic provider, so use this for optimization
 * @returns
 */
export const getInfuraProvider = () => {
    return new providers.InfuraProvider(
        "homestead",
        process.env.NEXT_PUBLIC_INFURA_KEY,
    );
};
