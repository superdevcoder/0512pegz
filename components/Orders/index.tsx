import { AssetFromAPI } from "../../types";
import Bid, { LastSale } from "../Bid";

import styles from "./Orders.module.scss";

const Orders: React.FC<{
    asset: AssetFromAPI;
}> = ({ asset }) => {
    const lastSale = asset?.last_sale;

    console.log("last sale:", lastSale);
    const buyOrders = asset?.orders
        ? asset.orders.filter((order) => order.side === 0)
        : [];
    return (
        <div className={styles.orders}>
            <div className={styles.ordersSection}>
                <h2>History</h2>
                {lastSale && <LastSale asset={asset} />}
                {buyOrders.map((buyOrder) => (
                    <Bid key={buyOrder.order_hash} buyOrder={buyOrder} />
                ))}
                {!buyOrders.length && <p>No orders yet</p>}
            </div>
        </div>
    );
};

export default Orders;
