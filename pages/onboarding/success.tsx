import Link from "next/link";
import styles from "../../styles/landing.module.scss";

export const SuccessPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <img
                    className={styles.success}
                    src="/images/success.svg"
                    alt="Success!"
                />
                <h2>You&rsquo;re all Set!</h2>
                <p>You can now bid on your favourite NFT</p>
                <Link href="/">
                    <button>Continue</button>
                </Link>
            </div>
        </div>
    );
};

export default SuccessPage;
