import { BigNumber, Contract, providers } from "ethers";

import { Network, OpenSeaPort } from "opensea-js";
import { WyvernProtocol } from "wyvern-js";

export const WETH_ADDR = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
const WETH_ABI = [
    "function deposit() public payable",
    "function withdraw(uint wad) public",
    "function balanceOf(address account) public view returns (uint256)",
    "function allowance(address account, address account2) public view returns (uint256)",
];

/**
 * Wrap the given ETH amount into WETH
 * @param amount
 * @param signer
 * @returns
 */
export const wrapETH = async (
    amount: BigNumber,
    signer: providers.JsonRpcSigner,
): Promise<providers.TransactionReceipt> => {
    const weth = new Contract(WETH_ADDR, WETH_ABI, signer);
    const tx = await weth.deposit({ value: amount });
    const result = await tx.wait();
    return result;
};

/**
 * Get the given address WETH Balance
 * @param address
 * @param provider
 * @returns
 */
export const getWETHBalance = async (
    address: string,
    provider: providers.JsonRpcProvider,
): Promise<BigNumber> => {
    const weth = new Contract(WETH_ADDR, WETH_ABI, provider);
    const balance = await weth.balanceOf(address);
    return balance;
};

/* Allowance */
/**
 * Add max allowance to the proxyAddress
 * @param seaport
 * @param accountAddress
 */
export const addWETHAllowance = async (
    seaport: OpenSeaPort,
    accountAddress: string,
) => {
    return seaport.approveFungibleToken({
        accountAddress,
        tokenAddress: WETH_ADDR,
    });
};

/**
 * Check if given address has already given allowance
 * @param accountAddress
 * @param provider
 */
export const hasGivenWETHAllowance = async (
    accountAddress: string,
    provider: providers.JsonRpcProvider, // If issues cast to any
): Promise<boolean> => {
    const proxyAddress = WyvernProtocol.getTokenTransferProxyAddress(
        Network.Main,
    );
    const weth = new Contract(WETH_ADDR, WETH_ABI, provider);
    const allowance = await weth.allowance(accountAddress, proxyAddress);
    if (allowance.gt(0)) {
        // Allowance was given, if it wasn't they'll ask for it anyway
        return true;
    }

    return false;
};
