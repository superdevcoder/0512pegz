import { utils } from "ethers";
import moment from "moment";
import React from "react";
import { useProfiles } from "../../context/SiteProfilesContext";
import { OrderFromAPI, Profile } from "../../types";
import styles from "./Bid.module.scss";

/**
 * Given address and list of profiles, return username
 * @param address
 * @param profiles
 * @returns
 */
const getUserName = (address: string, profiles: Profile[]): string => {
    const found = profiles.find(
        (el) => el.address.toLowerCase() === address.toLowerCase(),
    );
    return found ? found.username : String(address).substring(0, 6);
};

const Bid: React.FC<{ buyOrder: OrderFromAPI }> = ({ buyOrder }) => {
    const date = moment(
        Number(buyOrder.listing_time.toString()) * 1000,
    ).toISOString();
    const profiles = useProfiles();
    return (
        <div className={styles.bid}>
            <div>
                <p className={styles.bidder}>
                    Bid Placed by{" "}
                    {getUserName(buyOrder.maker.address, profiles)}
                </p>
                <p className={styles.date}>at {date}</p>
            </div>

            <p className={styles.price}>
                {utils.formatEther(buyOrder.base_price.toString())} ETH
            </p>
        </div>
    );
};

const LastSale: React.FC<{ asset: any }> = ({ asset }) => {
    const { last_sale: lastSale } = asset;
    const date = new Date(lastSale.event_timestamp).toISOString();
    const { address } = lastSale.transaction.to_account;
    const price = lastSale.total_price;
    console.log("Last Sale:", lastSale);
    console.log("date:", date);
    console.log("address:", address);
    console.log("price:", price);

    const profiles = useProfiles();
    // return null
    return (
        <div className={styles.bid}>
            <div>
                <p className={styles.bidder}>
                    Bid Placed by {getUserName(address, profiles)}
                </p>
                <p className={styles.date}>at {date}</p>
            </div>

            <p className={styles.price}>
                {utils.formatEther(price.toString())} ETH
            </p>
        </div>
    );
};

export default Bid;
export { LastSale };
