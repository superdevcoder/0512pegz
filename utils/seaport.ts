import { OpenSeaPort, Network } from "opensea-js";

export const makeSeaport = (signerOrProvider?: any) => {
    console.log("signerOrProvider", signerOrProvider);
    return new OpenSeaPort(signerOrProvider || window.ethereum, {
        networkName: Network.Main,
        apiKey: process.env.NEXT_PUBLIC_OPENSEA_KEY || undefined,
    });
};
