import { createContext, useState, useEffect, useContext } from "react";
import { ethers, providers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { makeSeaport } from "../utils/seaport";
import useEagerConnect from "../hooks/useEagerConnect";
import { injected, walletconnect } from "../utils/connectors";

export interface User {
    address: string;
    provider: ethers.providers.Web3Provider;
    seaport: any;
}

type UserContextData = {
    user: User | null;
    login: (useWalletConnect?: boolean) => Promise<void>;
};

const UserContext = createContext<UserContextData>({
    user: null,
    login: (useWalletConnect?: boolean) => null,
});
export default UserContext;

export const UserContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEagerConnect(); // Adds users on first load
    const { activate, active, library, account } = useWeb3React();

    /** Login with metamask */
    const activateMetamask = async () => activate(injected);

    /** Login with walletconnect */
    const activateWalletConnect = async () => activate(walletconnect);

    /**
     * Given the Magic Provider, return address and provider
     */
    const getAddressAndProvider = async (provider: any) => {
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        console.log("provider", provider);
        const seaport = makeSeaport(
            provider.provider ? provider.provider : provider,
        );

        return { address, provider, seaport };
    };

    /**
     * On unlock set user
     */
    useEffect(() => {
        const fetchUser = async () => {
            if (active) {
                console.log("active", active);
                console.log("library", library);
                console.log("library", library.provider);
                try {
                    const res = await getAddressAndProvider(library);
                    setUser(res);
                } catch (err) {
                    alert(`Issue with getAddressAndProvider ${err}`);
                }
            } else {
                setUser(null);
            }
        };
        fetchUser();
    }, [active, library, account]);

    /**
     * Login with Metamask
     */
    const login = async (useWalletConnect?: boolean): Promise<void> => {
        try {
            if (useWalletConnect) {
                const res = await activateWalletConnect();
                console.log("useWalletConnect res", res);
            } else {
                activateMetamask();
            }
        } catch (err) {
            alert(`Exception in loggign in ${alert}`);
        }
        return null;
    };

    return (
        <UserContext.Provider
            value={{
                user,
                login,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useLogin = () => {
    const { login } = useContext(UserContext);

    return login;
};

export const useUser = () => {
    const { user } = useContext(UserContext);

    return user;
};
