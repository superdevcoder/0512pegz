import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { MAX_ETH } from "../../utils/constants";
import QRCode from "../../components/QrCode";
import CopyUserAddress from "../../components/CopyUserAddress";
import { useBalances } from "../../context/BalanceContext";
import styles from "../../styles/landing.module.scss";

const DepositETH: React.FC = () => {
    const user = useUser();
    const { eth: ethBalance } = useBalances();
    const router = useRouter();
    useEffect(() => {
        if (ethBalance.gt(MAX_ETH)) {
            router.push("/onboarding/weth");
        }
    }, [router, ethBalance]);

    if (!user) {
        return <div className={styles.container}>Please login</div>;
    }

    return (
        <div className={styles.container}>
            <h2>Please send ETH to continue</h2>
            <QRCode address={user.address} />
            <CopyUserAddress address={user.address} />
        </div>
    );
};

export default DepositETH;
