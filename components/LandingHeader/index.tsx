import Link from "next/link";
import styles from "./LandingHeader.module.scss";

const Header: React.FC = () => (
    <header>
        <div className={styles.header}>
            <Link href="/">
                <a>
                    <img src="/images/logo.png" alt="Chainsaw" />
                </a>
            </Link>
        </div>
    </header>
);

export default Header;
