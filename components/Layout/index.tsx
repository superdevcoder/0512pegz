import { useRouter } from "next/router";
import Footer from "../Footer";
import Header from "../Header";
import LandingHeader from "../LandingHeader";
import styles from "./Layout.module.scss";

const Layout: React.FC = ({ children }) => {
    const router = useRouter();
    
    const isLanding =
        router.pathname.includes("login") ||
        router.pathname.includes("onboarding");
    const isPegz =
        router.pathname.includes("pegz");

    return (
        <div className={styles.layout}>
            {isLanding && <LandingHeader />}
            {(!isPegz && !isLanding) && <Header />}

            {children}
            {!isPegz && <Footer />}
        </div>
    );
};

export default Layout;
