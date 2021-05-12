import { FormEvent, useEffect, useMemo, useState } from "react";
import { Order } from "opensea-js/lib/types";
import { useUser } from "../../context/UserContext";
import { bid } from "../../utils/bid";
import findMaxBid from "../../utils/findMaxBid";
import { fromStringToBN } from "../../utils/inputs";

import styles from "./BuyWidget.module.scss";
import { useBalances } from "../../context/BalanceContext";
import LoadingModal from "../LoadingModal";
import ResultModal from "../ResultModal";
import { OrderFromAPI } from "../../types";

const BuyWidget: React.FC<{
    address: string;
    tokenId: string;
    buyOrders: OrderFromAPI[];
    sellOrders: Order[];
    handleClose: () => void;
    reserve: string;
}> = ({ address, tokenId, buyOrders, sellOrders, handleClose, reserve }) => {
    const user = useUser();
    const { weth: wethBalance } = useBalances();

    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{
        error: boolean;
        message: string;
    } | null>(null);

    // Find max ETH VALUE
    useEffect(() => {
        const findMax = () => {
            const max = findMaxBid(buyOrders);
            const reservePrice = reserve ? Number(reserve) : 0;
            setAmount(String(Math.max(reservePrice, max)));
        };

        findMax();
    }, [buyOrders, sellOrders, reserve]);

    // Convert input to BN so we can use with Ethers
    const BNAmount = useMemo(() => fromStringToBN(amount, 18), [amount]);

    /**
     * Calculate if we need more WETH, wrap that
     * @param e
     * @returns
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Check Weth Balance, wrap enough to get to X
        const needed = BNAmount.sub(wethBalance);
        if (needed.gt(0)) {
            // Wrap more WETH
            alert(`You need more weth ${needed.toString()}`);
            return;
        }
        setLoading(true);
        // USER SEAPORT
        try {
            const tx = await bid(
                user.seaport,
                address,
                tokenId,
                "ERC721", // TODO: Make this change dynamically based on type of token
                user.address,
                parseFloat(amount || "0"),
            );
            setResult({
                error: false,
                message:
                    "Success! The order went through! It takes up to 1 minute for the order to show",
            });
        } catch (err) {
            setResult({
                error: true,
                message: err.message ? err.message.toString() : err.toString(),
            });
        }
        setLoading(false);
    };

    return (
        <div className={styles.purchase}>
            <h3>Place a Bid</h3>
            <p>Place a bid in WETH</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    step="0.001"
                    min={reserve}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <div className={styles.buttonContainer}>
                    <button disabled={loading}>
                        {loading ? "Loading" : "Bid"}
                    </button>
                </div>
            </form>
            {loading && <LoadingModal />}
            {result && (
                <ResultModal
                    handleClose={() => handleClose()}
                    result={result}
                />
            )}
        </div>
    );
};

export default BuyWidget;
