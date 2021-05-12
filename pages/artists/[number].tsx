import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Index.module.scss";
import { API_URL, ARTISTS_PER_PAGE } from "../../utils/constants";
import { Artist } from "../../types";
import Artists from "../../components/Artists";

export const ArtistsHome: React.FC<{
    artists: Artist[];
    hasMore: boolean;
    pageNumber: number;
}> = ({ artists, hasMore, pageNumber }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Chainsaw NFT</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Artists artists={artists} />
            <div className={styles.pageLink}>
                {pageNumber === 1 && (
                    <Link href="/">
                        <a>Prev Page</a>
                    </Link>
                )}
                {pageNumber > 1 && (
                    <Link href={`/page/${pageNumber - 1}`}>
                        <a>Prev Page</a>
                    </Link>
                )}
                {hasMore && (
                    <Link href={`/page/${pageNumber + 1}`}>
                        <a>Next Page</a>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ArtistsHome;

export async function getStaticPaths() {
    const tokenRes = await fetch(`${API_URL}/artists/count`);
    const count = await tokenRes.json();

    const pagesCount = Math.floor(count / ARTISTS_PER_PAGE);
    const pageCount = Array.from(Array(pagesCount + 1).keys());

    return {
        paths: pageCount
            // .filter((el) => el > 0) // remove 0 if you want to not have a home page clone
            .map((number) => ({
                params: { number: String(number) },
            })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const pageNumber = parseInt(params.number, 10);
    const page = pageNumber * ARTISTS_PER_PAGE;
    const nextPage = page + ARTISTS_PER_PAGE;

    const artistRes = await fetch(
        `${API_URL}/artists?_start=${page}&_limit=${ARTISTS_PER_PAGE}&_sort=priority:DESC`,
    );
    const artists = await artistRes.json();

    const artistsCount = await fetch(`${API_URL}/artists/count`);
    const count = await artistsCount.json();
    const hasMore = count / nextPage > 1;

    return {
        props: {
            artists,
            pageNumber,
            hasMore,
        },
    };
}
