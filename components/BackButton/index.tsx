import { useRouter } from "next/router";

import styles from "./BackButton.module.scss";

const BackButton = () => {
    const router = useRouter();

    return (
        <button
            onClick={() => {
                router.back();
            }}
            className={styles.backBtn}
            type="button"
        >
            <img src="/images/back-arrow.svg" alt="Back" />
        </button>
    );
};

export default BackButton;
