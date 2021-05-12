export const getBuyOrdersUrl = (address: string, tokenId: string) =>
    `https://api.opensea.io/wyvern/v1/orders?asset_contract_address=${address}&bundled=false&include_bundled=false&include_invalid=false&token_id=${tokenId}&side=0&limit=20&offset=0&order_by=eth_price&order_direction=desc`;

export const getSellOrdersUrl = (address: string, tokenId: string) =>
    `https://api.opensea.io/wyvern/v1/orders?asset_contract_address=${address}&bundled=false&include_bundled=false&include_invalid=false&token_id=${tokenId}&side=1&limit=20&offset=0&order_by=eth_price&order_direction=desc`;

export const getOrders = async (address: string, tokenId: string) => {
    const res = await fetch(getBuyOrdersUrl(address, tokenId));
    if (res.status !== 200) {
        throw new Error("Issue in getOrders");
    }
    const data = await res.json();
    return data.orders;
};

export const getHighestBid = async (address: string, tokenId: string) => {
    const res = await fetch(getBuyOrdersUrl(address, tokenId));
    const data = await res.json();
    return data[0].current_price;
};

export const getAssetUrl = (address: string, tokenId: string) =>
    `https://api.opensea.io/api/v1/asset/${address}/${tokenId}/`;

// token.last_sale.total_price for the price it got sold for

export const getSellOrders = async (address: string, tokenId: string) => {
    const res = await fetch(getSellOrdersUrl(address, tokenId));
    if (res.status !== 200) {
        return [];
    }
    const data = await res.json();
    return data.orders;
};
