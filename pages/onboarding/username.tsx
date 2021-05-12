import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useProfile, useSetProfile } from "../../context/ProfileContext";
import styles from "../../styles/landing.module.scss";

export const UsernamePage = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const setProfile = useSetProfile();
    const profile = useProfile();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await setProfile(name);
        setLoading(false);
        router.push("/");
    };

    if (profile) {
        console.log(
            "Redirected from /onboarding/username because they already have profile",
        );
        router.push("/onboarding/eth");
    }

    return (
        <div className={styles.container}>
            <h2>Add your Username</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Satoshi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Loading" : "Save"}
                </button>
            </form>
            <Link href="/onboarding/eth">
                <a className={styles.skip}>I prefer not to</a>
            </Link>
        </div>
    );
};

export default UsernamePage;
