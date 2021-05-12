import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Index.module.scss";
import {
    API_URL,
    SOLD_TOKENS_QUERY,
    TOKENS_PER_PAGE,
} from "../../utils/constants";
import { NFT } from "../../types";
import Auctions from "../../components/Auctions";
import HeadWithImage from "../../components/HeadWithImage";

export const SoldTokensPage: React.FC<{
    assets: NFT[];
    hasMore: boolean;
    pageNumber: number;
}> = ({ assets, hasMore, pageNumber }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Chainsaw NFT</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeadWithImage />
            <Auctions assets={assets} />
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

export default SoldTokensPage;

export async function getStaticPaths() {
    const tokenRes = await fetch(
        `${API_URL}/tokens/count?${SOLD_TOKENS_QUERY}`,
    );
    const count = await tokenRes.json();
    const pagesCount = Math.floor(count / TOKENS_PER_PAGE);
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
    const page = pageNumber * TOKENS_PER_PAGE;
    const nextPage = page + TOKENS_PER_PAGE;

    const tokenRes = await fetch(
        `${API_URL}/tokens?_start=${page}&_limit=${TOKENS_PER_PAGE}&${SOLD_TOKENS_QUERY}`,
    );
    const allTokens = await tokenRes.json();

    const tokenCountRes = await fetch(
        `${API_URL}/tokens/count?${SOLD_TOKENS_QUERY}`,
    );
    const count = await tokenCountRes.json();

    const hasMore = count / nextPage > 1;
    return {
        props: {
            assets: allTokens,
            hasMore,
            pageNumber,
        },
    };
}
