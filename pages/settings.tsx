import Link from "next/link";
import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import { useUser } from "../context/UserContext";
import { useAllowance } from "../context/BalanceContext";
import { useProfile, useSetProfile } from "../context/ProfileContext";
import styles from "../styles/landing.module.scss";

const SettingsPage: React.FC = () => {
    const user = useUser();
    const router = useRouter();
    const profile = useProfile();
    const setProfile = useSetProfile();
    const [newName, setNewName] = useState("");
    const [loading, setLoading] = useState(false);

    const allowance = useAllowance();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await setProfile(newName);
        setLoading(false);
    };

    if (!user) {
        return (
            <Link href="/login">
                <a>Please Login First</a>
            </Link>
        );
    }

    return (
        <div className={styles.container}>
            <h2>Settings</h2>
            <p>Your username {profile?.username}</p>
            <h2>Change your Username</h2>

            <form onSubmit={handleSubmit}>
                <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <button type="submit">
                    {loading ? "Changing your name" : "Change Name"}
                </button>
            </form>

            <div className={styles.tiny}>
                {allowance
                    ? "You've given approval for Chain/Saw to connect to your wallet"
                    : "You need to give allowance"}
            </div>

            <div>
                <h2>Deposit and Wrap ETH</h2>
                <Link href="/deposit">
                    <button>Deposit and Wrap ETH</button>
                </Link>
            </div>
        </div>
    );
};

export default SettingsPage;
