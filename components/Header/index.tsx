import Link from "next/link";
import { useRouter } from "next/router";
import UserSignup from "../UserSignup";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
    return (
        <header>
            <div className={styles.header}>
                <div className={styles.left}>
                    <div>
                        <Link href="/">
                            <a>
                                <img
                                    className={styles.smallLogo}
                                    src="/images/logoclear.png"
                                    alt="Chainsaw"
                                />
                                <img
                                    className={styles.logo}
                                    src="/images/logo.png"
                                    alt="Chainsaw"
                                />
                            </a>
                        </Link>
                    </div>
                    <div className={styles.social}>
                        <a href="https://www.instagram.com/chainsaw_nft">
                            <img src="/logos/instagram.png" alt="discord" />
                        </a>
                        <a href="https://discord.com/invite/aXQqKxKggh">
                            <img src="/logos/discord.png" alt="discord" />
                        </a>
                        <a href="https://twitter.com/ChainSawNFT">
                            <img src="/logos/twitter.png" alt="discord" />
                        </a>
                    </div>
                </div>
                <div className={styles.right}>
                    <div>
                        <UserSignup />
                    </div>
                    <div>
                        <div className={styles.links}>
                            <div>
                                <Link href="/about">
                                    <a>About</a>
                                </Link>
                            </div>
                            <div>
                                <Link href="/artists">
                                    <a>Artists</a>
                                </Link>
                            </div>
                            <div>
                                <Link href="/conversations">
                                    <a>Conversations</a>
                                </Link>
                            </div>
                            <div>
                                <Link href="/faq">
                                    <a>FAQ</a>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.social}>
                            <a href="https://www.instagram.com/chainsaw_nft">
                                <img src="/logos/instagram.png" alt="discord" />
                            </a>
                            <a href="https://discord.com/invite/aXQqKxKggh">
                                <img src="/logos/discord.png" alt="discord" />
                            </a>
                            <a href="https://twitter.com/ChainSawNFT">
                                <img src="/logos/twitter.png" alt="discord" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
