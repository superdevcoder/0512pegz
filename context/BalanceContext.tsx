import { BigNumber } from "ethers";
import { createContext, useEffect, useContext } from "react";
import useETHBalance from "../hooks/useETHBalance";
import useHasGivenWETHAllowance from "../hooks/useHasGivenWETHAllowance";
import useWETHBalance from "../hooks/useWETHBalance";
import { useUser } from "./UserContext";

type BalanceContextData = {
    eth: BigNumber | null;
    weth: BigNumber | null;
    allowance: boolean | null;
};

const BalanceContext = createContext<BalanceContextData>({
    eth: null,
    weth: null,
    allowance: null,
});
export default BalanceContext;

export const BalanceContextProvider: React.FC = ({ children }) => {
    const user = useUser();
    const [weth, reloadWETH] = useWETHBalance(user);
    const [eth, reloadETH] = useETHBalance(user);
    const {
        allowance,
        reload: reloadAllowance,
        loading: loadingAllowance,
    } = useHasGivenWETHAllowance(user);

    // Reload balances and allowance every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            reloadWETH();
            reloadETH();
            reloadAllowance();
        }, 10000);
        return () => clearInterval(interval);
    }, [reloadWETH, reloadETH, reloadAllowance]);

    return (
        <BalanceContext.Provider
            value={{
                eth,
                weth,
                allowance,
            }}
        >
            {children}
        </BalanceContext.Provider>
    );
};

export const useAllowance = () => {
    const { allowance } = useContext(BalanceContext);

    return allowance;
};

export const useBalances = () => {
    const { eth, weth } = useContext(BalanceContext);
    return { eth, weth };
};
