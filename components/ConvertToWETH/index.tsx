import { utils, BigNumber } from "ethers";
import { FormEvent, useMemo, useState } from "react";
import { useBalances } from "../../context/BalanceContext";
import { useUser } from "../../context/UserContext";
import { MAX_ETH } from "../../utils/constants";
import { fromStringToBN } from "../../utils/inputs";
import { wrapETH } from "../../utils/weth";
import ResultModal from "../ResultModal";
import LoadingModal from "../LoadingModal";

const ConvertToWETH = () => {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState<{
        error: boolean;
        message: string;
    } | null>(null);

    const user = useUser();
    const { eth: ethBalance } = useBalances();

    const BNAmount = useMemo(() => fromStringToBN(amount, 18), [amount]);

    const convertEthToWeth = async (e: FormEvent) => {
        setLoading(true);
        try {
            e.preventDefault();
            if (BNAmount.gt(ethBalance)) {
                alert("Too big");
            }

            await wrapETH(BNAmount, user.provider.getSigner());

            setResult({
                error: false,
                message: `Successfully wrapped ${amount} of WETH`,
            });
        } catch (err) {
            setResult({
                error: true,
                message: err.message ? err.message.toString() : err.toString(),
            });
        }
        setLoading(false);
    };

    const fromBNToString = (number: BigNumber) =>
        String(parseFloat(utils.formatEther(number.toString())));

    const dangerous = ethBalance.sub(BNAmount).lt(MAX_ETH);
    return (
        <div>
            {loading && <LoadingModal hideAllowance />}
            {result && (
                <ResultModal
                    result={result}
                    handleClose={() => setResult(null)}
                />
            )}
            <h3>Convert ETH to WETH </h3>
            {dangerous && (
                <p>
                    THIS SEEMS DANGEROUS, you probably have too little ETH to
                    continue
                </p>
            )}
            <form onSubmit={convertEthToWeth}>
                <input
                    type="number"
                    step="0.001"
                    value={amount}
                    max={fromBNToString(ethBalance)}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button disabled={loading} type="submit">
                    {loading ? "Loading" : "Wrap ETH"}
                </button>
            </form>
        </div>
    );
};
export default ConvertToWETH;
