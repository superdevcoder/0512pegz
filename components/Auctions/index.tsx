import Link from "next/link";
import { NFT } from "../../types";
import Asset from "../Asset";
import styles from "./Auctions.module.scss";

const fromTitleToImageUrl = (title: string): string => {
    switch (title) {
        case "Sold":
            return "/images/Sold.png";
        case "Upcoming":
            return "/images/Upcoming.png";
        default:
            return "/images/Auctions.png";
    }
};

const Auctions: React.FC<{
    assets: NFT[];
    title?: string;
    link?: string;
}> = ({ assets, title, link }) => {
    return (
        <main className={styles.auctions}>
            <div className={styles.headline}>
                <div className={styles.title}>
                    <img alt="Live Auctions" src={fromTitleToImageUrl(title)} />
                </div>
                <div className={styles.divider}>
                    <hr />
                </div>
                <div className={styles.rightLink}>
                    {link && <Link href={link}>View All</Link>}
                </div>
            </div>
            <div className={styles.auctionsContainer}>
                {assets.map(
                    ({
                        description,
                        imageUrl,
                        name,
                        slug,
                        reserve,
                        artist,
                        onSale,
                        file,
                        sold,
                        soldFor,
                    }) => (
                        <>
                            <Asset
                                onSale={onSale}
                                artist={artist?.name}
                                key={name}
                                sold={sold}
                                soldFor={soldFor}
                                slug={slug}
                                description={description}
                                imageUrl={imageUrl}
                                name={name}
                                reserve={reserve}
                                file={file}
                            />
                        </>
                    ),
                )}
            </div>
        </main>
    );
};

export default Auctions;
