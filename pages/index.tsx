import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Index.module.scss";
import {
    API_URL,
    AVAILABLE_TOKENS_QUERY,
    SOLD_TOKENS_IN_HOME,
    SOLD_TOKENS_QUERY,
    TOKENS_IN_HOME,
    UPCOMING_TOKENS_QUERY,
    UPCOMING_TOKENS_IN_HOME,
} from "../utils/constants";
import { NFT, Slide } from "../types";
import Auctions from "../components/Auctions";
import ActiveAuctions from "../components/ActiveAuctions";
import Slider from "../components/Slider";
import HeadWithImage from "../components/HeadWithImage";
// index page start
export const Home: React.FC<{
    assets: NFT[];
    sold: NFT[];
    upcoming: NFT[];
    slides: Slide[];
}> = ({ assets, slides, sold, upcoming }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Chainsaw NFT</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeadWithImage />
            <Slider slides={slides} />
            {assets?.length > 0 && (
                <ActiveAuctions assets={assets} link="/auctions/0" />
            )}
            {sold?.length > 2 && (
                <Auctions assets={sold} title="Sold" link="/sold/0" />
            )}
            {upcoming?.length > 0 && (
                <Auctions
                    assets={upcoming}
                    title="Upcoming"
                    link="/upcoming/0"
                />
            )}
        </div>
    );
};

export default Home;

export async function getStaticProps() {
    /** Get tokens with auctions */
    const availableTokenRes = await fetch(
        `${API_URL}/tokens?_limit=${TOKENS_IN_HOME}&${AVAILABLE_TOKENS_QUERY}`,
    );
    const availableTokens = await availableTokenRes.json();

    /** Get tokens sold */
    const soldTokensRes = await fetch(
        `${API_URL}/tokens?_limit=${SOLD_TOKENS_IN_HOME}&${SOLD_TOKENS_QUERY}`,
    );
    const sold = await soldTokensRes.json();

    /** Get tokens not on sale and not sold */
    const upcomingTokensRes = await fetch(
        `${API_URL}/tokens?_limit=${UPCOMING_TOKENS_IN_HOME}&${UPCOMING_TOKENS_QUERY}`,
    );
    const upcoming = await upcomingTokensRes.json();

    /** Get slides */
    let slides = [];
    try {
        const slidesRes = await fetch(`${API_URL}/slider`);
        const sliderData = await slidesRes.json();
        slides = sliderData.slides as Slide[];
    } catch (err) {
        console.log("Exception in loading slides, defaulting to empty list");
    }

    return {
        props: {
            assets: availableTokens,
            sold,
            upcoming,
            slides,
        },
    };
}
