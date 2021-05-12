import { useState, FormEvent } from "react";
import { useLogin } from "../../context/UserContext";

import styles from "./Signup.module.scss";

const Signup = (): JSX.Element => {
    const [loading, setLoading] = useState(false);
    const login = useLogin();

    const handleMetamask = async (e: FormEvent) => {
        setLoading(true);
        e.preventDefault();
        await login();
    };

    const handleWalletConnect = async (e: FormEvent) => {
        setLoading(true);
        e.preventDefault();
        await login(true);
    };

    return (
        <section className={styles.signup}>
            <h2>Log in with Metamask</h2>
            <button onClick={handleMetamask} type="submit">
                {loading ? "Loading" : "Log in"}
            </button>
            <h2>Log in with WalletConnect (all mobile users)</h2>
            <button onClick={handleWalletConnect} type="submit">
                {loading ? "Loading" : "Log in with WalletConnect"}
            </button>
        </section>
    );
};

export default Signup;
