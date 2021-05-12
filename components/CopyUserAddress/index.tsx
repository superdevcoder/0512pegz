import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect, useState } from "react";

import styles from "./CopyUserAddress.module.scss";

type CopyUserAddressProps = {
    address: string;
};

const CopyUserAddress = ({ address }: CopyUserAddressProps): JSX.Element => {
    const [copied, setCopied] = useState<boolean>(false);

    /**
     * Sets copied back to false
     */
    useEffect(() => {
        let timeout = setTimeout(() => null, 500);
        if (copied) {
            timeout = setTimeout(() => {
                setCopied(false);
            }, 500);
        }
        return () => clearTimeout(timeout);
    }, [copied]);

    return (
        <CopyToClipboard text={address} onCopy={() => setCopied(true)}>
            <div className={`${styles.copyUserAddress} ${styles.gray}`}>
                <p>{copied ? "Copied" : address}</p>
            </div>
        </CopyToClipboard>
    );
};

export default CopyUserAddress;
