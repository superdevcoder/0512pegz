import MarkdownRenderer from "../../components/MarkdownRenderer";

import { API_URL } from "../../utils/constants";
import { Artist } from "../../types";
import styles from "../../styles/artist.module.scss";
import Auctions from "../../components/Auctions";
import HeadWithImage from "../../components/HeadWithImage";

import BackButton from "../../components/BackButton";

const SingleArtistPage: React.FC<{ artist: Artist }> = ({ artist }) => {
    return (
        <main className={styles.artist}>
            <HeadWithImage
                imageUrl={artist.imageUrl}
                title={artist.name}
                description={artist.description}
            />
            <div className={styles.btnContainer}>
                <BackButton />
            </div>
            <div className={styles.header}>
                <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className={styles.artistAvatar}
                />

                <div className={styles.info}>
                    <h1>{artist.name}</h1>
                    <div className={styles.socials}>
                        {artist.websiteUrl && (
                            <a href={artist.websiteUrl}>
                                <img src="/images/website.svg" alt="Website" />
                            </a>
                        )}
                        {artist.twitterUrl && (
                            <a href={artist.twitterUrl}>
                                <img src="/images/twitter.svg" alt="Twitter" />
                            </a>
                        )}
                        {artist.instagramUrl && (
                            <a href={artist.instagramUrl}>
                                <img
                                    src="/images/instagram.svg"
                                    alt="Instagram"
                                />
                            </a>
                        )}
                    </div>
                    <MarkdownRenderer markdown={artist.description} />

                    <div className={styles.extraInfo}>
                        <h2>{artist?.extraTitle}</h2>
                        {artist?.extraContent && (
                            <MarkdownRenderer markdown={artist.extraContent} />
                        )}
                    </div>
                </div>
            </div>
            {artist?.tokens?.length && <Auctions assets={artist.tokens} />}
        </main>
    );
};

export default SingleArtistPage;

export async function getStaticPaths() {
    const artistRes = await fetch(`${API_URL}/artists?_limit=-1`);
    const artists = await artistRes.json();

    return {
        paths: artists.map((artist: Artist) => ({
            params: { slug: artist.slug },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const artistRes = await fetch(`${API_URL}/artists?slug=${params.slug}`);
    const artist = await artistRes.json();
    const found = artist[0];
    return {
        props: {
            artist: found,
        },
    };
}
