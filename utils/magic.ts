import { Signer, utils } from "ethers";

/**
 * Does a raw signature given a signer
 * @param signer
 * @param message
 * @returns
 */
export const getToken = async (signer: Signer, message: string) => {
    const signature = await signer.signMessage(message);
    return signature;
};

/**
 * Given a signature and the message, returns the public address
 * @param token
 * @param message
 * @returns
 */
export const verifyToken = (message: string, token: string): string => {
    return utils.verifyMessage(message, token);
};
