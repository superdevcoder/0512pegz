import { utils } from "ethers";
import { OrderFromAPI } from "../types";

const findMaxBid = (buyOrders: OrderFromAPI[] = []): number => {
    let max = 0;
    try {
        buyOrders.forEach((buyOrder) => {
            console.log("buyOrder.base_price", buyOrder.base_price);
            const parsed = parseFloat(
                utils
                    .formatEther(buyOrder.base_price.toString())
                    .replace("/,/g", ""),
            );

            console.log("parsed", parsed);
            if (parsed > max && buyOrder.side === 0) {
                max = parsed;
            }
        });
    } catch (err) {
        console.log("Exception in findMaxBid", err);
    }
    return max;
};

export default findMaxBid;
