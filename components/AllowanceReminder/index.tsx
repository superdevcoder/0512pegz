import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAllowance } from "../../context/BalanceContext";
import { useUser } from "../../context/UserContext";
import styles from "./AllowanceReminder.module.scss";

const AllowanceReminder: React.FC = () => {
    const user = useUser();
    const allowance = useAllowance();
    const router = useRouter();

    const [show, setShow] = useState(true);

    if (user && !allowance && !router.pathname.includes("onboarding") && show) {
        return (
            <div className={styles.reminder}>
                <h3>Seems like you need to onboard</h3>
                <Link href="/onboarding/username">
                    <button className={styles.button}>Onboard</button>
                </Link>
                <button className={styles.skip} onClick={() => setShow(false)}>
                    Stop showing me this
                </button>
            </div>
        );
    }

    return null;
};

export default AllowanceReminder;
