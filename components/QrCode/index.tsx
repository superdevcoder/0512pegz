import EthereumQRPlugin from "ethereum-qr-code";
import { useEffect } from "react";
import styles from "./QrCode.module.scss";

// Thank you @NikVogri
// https://github.com/GalloDaSballo/atossa-frontend/blob/main/components/QRCode.tsx

const QRCode: React.FC<{ address: string }> = ({ address }) => {
    useEffect(() => {
        const qr = new EthereumQRPlugin();

        qr.toCanvas(
            {
                to: address || "",
                value: 1,
            },
            {
                selector: `.${styles.qrcode}`,
                scale: 60,
            },
        );
    }, [address]);

    return <div className={styles.qrcode} />;
};

export default QRCode;
