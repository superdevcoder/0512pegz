import styles from "../styles/About.module.scss";

const AboutPage: React.FC = () => (
    <div className={styles.container}>
        <div className={styles.left}>
            <img src="/images/about.png" alt="About chainsaw" />
        </div>
        <div className={styles.right}>
            <h2>About</h2>
            <div>
                <p>
                    Chain/Saw is a space for artists and collectors to both
                    create and experiment with a new digital art paradigm,
                </p>
                <p> and ultimately shape it. </p>
                <p>- </p>
                <p> </p>
                <p>
                    As an NFT marketplace, Chain/Saw presents a curated
                    selection of visionary projects that call into
                </p>
                <p>
                    question what blockchain art can be. Chain/Saw was founded
                    by Frank Musarra, an artist, musician, and
                </p>
                <p>
                    creative technologist deeply embedded at the intersection of
                    art and technology. The project arose
                </p>
                <p>
                    through conversations with peers who shared a common
                    curiosity with this emergent space, though with
                </p>
                <p>
                    this curiosity comes trepidation — what does the future of
                    NFT art look like? What are the implications of
                </p>
                <p>
                    this movement for “legacy” art worlds? Chain/Saw was founded
                    to further the challenging conversation
                </p>
                <p>
                    surrounding the future of digital art, engaging a community
                    of artists, inspired collectors, and curious
                </p>
                <p>audiences alike.</p>
            </div>
        </div>
    </div>
);

export default AboutPage;
