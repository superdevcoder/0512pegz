import Head from "next/head";
import styles from "../styles/faq.module.scss";
import { API_URL } from "../utils/constants";
import { Faq } from "../types";
import FaqAccordion from "../components/FaqAccordion";

export const FaqPage: React.FC<{ faq: Faq[] }> = ({ faq }) => {
    return (
        <div className={styles.faq}>
            <Head>
                <title>Chainsaw NFT</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Frequently Asked Questions</h1>
            <FaqAccordion faq={faq} />
        </div>
    );
};

export default FaqPage;

export async function getStaticProps() {
    let faq = [];
    try {
        const faqRes = await fetch(`${API_URL}/faq`);
        const faqData = await faqRes.json();
        faq = faqData.QandA;
    } catch (err) {
        console.log("Exception in fetching faq", err);
    }

    return {
        props: {
            faq,
        },
    };
}
