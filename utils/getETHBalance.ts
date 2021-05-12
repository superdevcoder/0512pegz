import { BigNumber, ethers } from "ethers";

const getETHBalance = async (
    provider: ethers.providers.Web3Provider,
): Promise<BigNumber> => {
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    return balance;
};

export default getETHBalance;
