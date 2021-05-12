import Link from "next/link";
import MarkdownRenderer from "../MarkdownRenderer";
import styles from "./Artist.module.scss";

const Artist: React.FC<{
    imageUrl: string;
    name: string;
    slug: string;
    description: string;
}> = ({ imageUrl, name, slug, description }) => (
    <Link href={`/artist/${slug}`}>
        <a>
            <div className={styles.artist}>
                <div className={styles.imageContainer}>
                    <img src={imageUrl} alt={name} />
                </div>
                <div className={styles.info}>
                    <h3>{name}</h3>
                    {description && <MarkdownRenderer markdown={description} />}
                    <div>
                        <button>See Collection</button>
                    </div>
                </div>
            </div>
        </a>
    </Link>
);

export default Artist;
