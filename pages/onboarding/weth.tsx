import { utils } from "ethers";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../context/UserContext";
import { MAX_ETH } from "../../utils/constants";
import { addWETHAllowance, wrapETH } from "../../utils/weth";
import { useAllowance, useBalances } from "../../context/BalanceContext";
import styles from "../../styles/landing.module.scss";
import Loading from "../../components/Loading";
import ConvertToWETH from "../../components/ConvertToWETH";

const WETHPage: React.FC = () => {
    const user = useUser();
    const { eth: ethBalance, weth: wethBalance } = useBalances();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const allowance = useAllowance();

    const approveWETH = async () => {
        setLoading(true);
        await addWETHAllowance(user.seaport, user.address);
        setLoading(false);
    };

    const convertEthToWeth = async () => {
        setLoading(true);
        await wrapETH(ethBalance.sub(MAX_ETH), user.provider.getSigner());
        setLoading(false);
        router.push("/onboarding/success");
    };

    if (!user) {
        return <div>Please login</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {!allowance && (
                    <div>
                        <img
                            className={styles.img}
                            src="/images/ethereum.svg"
                            alt="Step 1, Approve WETH"
                        />
                        <h2>PART 1 Approve WETH</h2>
                        <p>
                            Approve the Router so it can spend your WETH to bid
                            on art
                        </p>
                        {ethBalance.gt(MAX_ETH) && (
                            <button disabled={loading} onClick={approveWETH}>
                                {loading ? (
                                    <Loading message="Approving. Please Wait" />
                                ) : (
                                    "Approve"
                                )}
                            </button>
                        )}
                        {ethBalance.lte(MAX_ETH) && (
                            <p>
                                It seems like you don&rsquo;t have enough ETH to
                                continue, please
                                <Link href="/onboarding/eth">
                                    <a> send more</a>
                                </Link>
                            </p>
                        )}
                    </div>
                )}

                {allowance && (
                    <div>
                        <img
                            className={styles.img}
                            src="/images/ethereum.svg"
                            alt="Step 2, Wrap ETH into WETH"
                        />
                        <h2>PART 2 Wrap ETH into WETH</h2>
                        <p>Wrap your ETH so you can start bidding!</p>
                        <ConvertToWETH />
                    </div>
                )}

                {ethBalance.lte(MAX_ETH) && (
                    <p>
                        You don&rsquo;t have enough ETH,{" "}
                        <Link href="/onboarding/eth">
                            <a>please send more ETH</a>
                        </Link>
                    </p>
                )}

                <p className={styles.tiny}>
                    We&rsquo;ll keep 0.01 as ETH so you can withdraw your funds
                    at any time
                    <br />
                    Current ETH Balance{"  "}
                    {utils.formatEther(ethBalance) || "0.00"}
                    <br />
                    Current WETH Balance {utils.formatEther(wethBalance)}
                </p>
            </div>
        </div>
    );
};

export default WETHPage;
