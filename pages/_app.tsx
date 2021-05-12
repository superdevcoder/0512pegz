/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from "next/dist/next-server/lib/router/router";
import { Web3ReactProvider } from "@web3-react/core";
import { providers } from "ethers";
import { UserContextProvider } from "../context/UserContext";
import "../styles/global.scss";
import Layout from "../components/Layout";
import { BalanceContextProvider } from "../context/BalanceContext";
import { ProfileContextProvider } from "../context/ProfileContext";
import { SiteProfileContextProvider } from "../context/SiteProfilesContext";

function getLibrary(provider) {
    return new providers.Web3Provider(provider); // this will vary according to whether you use e.g. ethers or web3.js
}
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <UserContextProvider>
                <ProfileContextProvider>
                    <BalanceContextProvider>
                        <SiteProfileContextProvider>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </SiteProfileContextProvider>
                    </BalanceContextProvider>
                </ProfileContextProvider>
            </UserContextProvider>
        </Web3ReactProvider>
    );
};

export default MyApp;
