import Link from "next/link";
import Signup from "../components/Signup";
import { useAllowance } from "../context/BalanceContext";
import { useProfile } from "../context/ProfileContext";
import { useUser } from "../context/UserContext";
import styles from "../styles/landing.module.scss";

const LoginPage: React.FC = () => {
    const user = useUser();
    const profile = useProfile();
    const allowance = useAllowance();
    if (user) {
        return (
            <div className={styles.container}>
                <h2>Your are logged in</h2>

                <div>
                    {!profile && (
                        <Link href="/onboarding/username">
                            <a>Add a username</a>
                        </Link>
                    )}
                    {!allowance && (
                        <p>
                            It seems like you didn&rsquo;t give approval to the
                            router, you can do that when you place your first
                            bid
                        </p>
                    )}
                </div>

                <Link href="/">
                    <button className={styles.enterButton}>
                        ENTER CHAINSAW
                    </button>
                </Link>
                <Link href="/settings">
                    <a>Change Settings</a>
                </Link>
            </div>
        );
    }
    return (
        <div className={styles.container}>
            <Signup />
        </div>
    );
};

export default LoginPage;
